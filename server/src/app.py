from flask import Flask, request, jsonify
from auth import Auth
from database import init_db
from Models.project import ProjectSchema, Project
from auth import check_auth
from os import environ
from bson.objectid import ObjectId

from flask import Flask, json, jsonify, request
from flask_marshmallow import Marshmallow
# from flask_marshmallow import Marshmallow

from marshmallow import Schema, fields
from flask_cors import CORS
import marshmallow
from pymongo import MongoClient
import datetime
import ssl
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)


@app.route('/api/auth/', methods=["PUT", "POST"])
def handle_auth():
    json_data = request.get_json()
    auth_handler = Auth(json_data["uname"], json_data["pass"])

    if request.method == "POST":
        try:
            auth_handler.signup()
            respObject = jsonify({"message": "Signed Up!"})
            return respObject, 200
        except Exception as e:
            if str(e) == "User Exists":
                return jsonify({"message": str(e)}), 409
            else:
                print(e)
                return jsonify({"message": "Internal Server Error"}), 500
    else:
        try:
            if auth_handler.login():
                respObject = jsonify({"message": "Logged In!"})
                return respObject, 200
            else:
                return jsonify({"message": "Invalid Credentials"}), 405
        except Exception as e:
            if str(e) == "No Account":
                return jsonify({"message": str(e)}), 409
            else:
                print(e)
                return jsonify({"message": "Internal Server Error"}), 500
            

@app.route("/api/auth/signout/", methods=["POST"])
@check_auth
def handle_signout():
    Auth.logout()
    respObject = jsonify({"message": "Logged Out!"})
    return respObject, 200


@app.route('/api/projects/<pid>/', methods=('GET', 'PUT', 'DELETE'))
@check_auth
def handleSpecificProject(pid: str):
    schema = ProjectSchema()
    if request.method == 'GET':
        project = Project(id=pid, creator=request.user)
        try:
            project_data = project.get_project()
            return jsonify({"projectData": project_data}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    elif request.method == 'PUT':
        project = schema.load(request.json, partial=True, unknown="INCLUDE")
        project.id = ObjectId(pid)
        project.creator = request.user
        try:
            project.update_project()
            return jsonify({"message": "Project Updated"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    elif request.method == 'DELETE':
        project = Project(id=pid, creator=request.user)
        try:
            return jsonify({"projectData": project.delete_project()}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

@app.route('/api/projects/', methods=('GET', 'POST'))
@check_auth
def handleProjects():
    schema = ProjectSchema()
    if request.method == 'GET':
        if request.args.get('offset') is None:
            return jsonify({"message": "Missing Offset"}), 400
        project_data, count = Project.get_projects(int(request.args.get('offset')), request.user)            
        return jsonify({"projectData": project_data, "totalProjects": count}), 200
    elif request.method == 'POST':
        project = schema.load(request.json, partial=True, unknown="INCLUDE")
        project.creator = request.user
        project.create_project()
        return jsonify({"message": "Created Successfully"}), 201


db = None
project_db = None


class Hardware():
    def __init__(self, name, capacity, unitPrice, unitsUsed):
        self.name = name
        self.capacity = capacity
        self.unitPrice = unitPrice
        self.unitsUsed = unitsUsed

class HardwareSchema(Schema):
    class Meta:
        fields = ("name", "capacity", "unitPrice", "unitsUsed")

hardware_Schema = HardwareSchema()
hardwares_Schema = HardwareSchema(many=True)


class Project():
    def __init__(self, id, projectName, funds, description, lastUpdated, creator, dateCreated, hardwares):
        self.id = ObjectId(id)
        self.projectName = projectName
        self.funds = funds
        self.description = description
        self.lastUpdated = lastUpdated
        self.creator = creator
        self.dateCreated = dateCreated
        self.hardwares = hardwares

class ProjectSchema(Schema):
    id = fields.Str(attribute='_id')
    projectName = fields.Str()
    creator = fields.Str()
    hardwares = fields.Dict(fields.Str(), fields.Int())
    funds = fields.Float()
    description = fields.Str()
    dateCreated = fields.DateTime()
    dateUpdated = fields.DateTime()

project_Schema = ProjectSchema()
projects_Schema = ProjectSchema(many=True)


@app.route("/", methods = ["GET"])
def basic_aticles():
    return jsonify({"Hello": "World"})


@app.route("/get", methods = ["GET", "POST"])
def get_articles():
    documents = []
    for document in db.find():
        del document["_id"]
        documents.append(document)
    results = hardwares_Schema.dump(documents)
    return jsonify(results)


@app.route("/getProjects", methods = ["GET", "POST"])
def get_projects():
    documents = []
    for document in project_db.find():
        documents.append(document)
    results = projects_Schema.dump(documents)
    return jsonify(results)

@app.route("/get/<name>/", methods = ["GET", "POST"])
def get_article(name):
    print(name)
    document = db.find({"name": name})
    document = document[0]
    return hardware_Schema.jsonify(document)

@app.route("/updateProjects/", methods = ["PUT"])
def update_projects():
    print(request.json)
    new_projects = request.json['projects']
    for project in new_projects:
        print()
        print("printing project")
        print(project)
        projectName = project["projectName"]
        document = project_db.find({"projectName": projectName})[0]
        document["hardwares"] = project['hardwares']
        print("printing document")
        print(document)
        project_db.update_one({"projectName": projectName}, {"$set":document})

    return jsonify({"message": "Updated Successfully"}), 200

@app.route("/updateHardwareCount/", methods = ["PUT"])
def update_Hardware_Count():
    hardwareName = request.json["hardwareName"]
    unitsUsed = request.json['unitSum']
    document = db.find({'name': hardwareName})[0]
    # print(request.json)
    capacity = document['capacity']
    if unitsUsed < capacity:
        document['unitsUsed'] = unitsUsed
        db.update_one({"name": hardwareName}, {"$set":document})
        return jsonify({"message": "Created Successfully"}), 200
    else:
        return jsonify({"message": "Unsuccessful"}), 403
    # return get_projects()


@app.route("/add", methods = ["POST", "GET"])
def add_articles():
    name = request.json["name"]
    capacity = request.json['capacity']
    unitPrice = request.json["unitPrice"]
    unitsUsed = request.json["unitsUsed"]
    hw = Hardware(name, capacity, unitPrice, unitsUsed)
    db.insert_one(request.json)
    return hardware_Schema.jsonify(hw)

@app.route("/update/<name>/", methods = ["PUT"])
def update_article(name):
    print(name)
    print(request.json)
    document = db.find({"name": name})
    document = document[0]

    new_unitsUsed = request.json["unitsUsed"]
    print(new_unitsUsed)
    print(int(new_unitsUsed))
    document["unitsUsed"] = int(new_unitsUsed)
    db.update_one({"name": name}, {"$set":document})

    return hardware_Schema.jsonify(document)


@app.route("/delete/<name>/", methods = ["DELETE"])
def delete_article(name):
    print(name)
    document = db.find({"name": name})
    document = document[0]

    db.remove({"name":name})

    return hardware_Schema.jsonify(document)



def conenctDataBase():
    connect_link = "mongodb+srv://hershey:hershey@cluster0.fhyei.mongodb.net/test"
    client = MongoClient(connect_link,ssl_cert_reqs=ssl.CERT_NONE)

    global db
    db = client.Hardware_Tests.AllSets

    global project_db
    project_db = client.Sree_Tests.projects

    print("DataBase has been Connected")



if __name__ == "__main__":
    init_db()
    conenctDataBase()
    app.config.update(
        SESSION_COOKIE_HTTPONLY=False,
    )
    app.secret_key = environ.get("SECRET_KEY")
    app.run(debug=True, load_dotenv=True)

