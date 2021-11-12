from flask import Flask, request, jsonify
from Models.hardware import Hardware
from auth import Auth
from database import init_db
from Models.project import ProjectSchema, Project
from auth import check_auth
from os import environ
from bson.objectid import ObjectId
from marshmallow import Schema, fields
from flask_cors import CORS
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
def handle_specific_project(pid: str):
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
def handle_projects():
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


@app.route("/api/hardware/", methods = ("GET", "PUT"))
def handle_hardware():
    if request.method == "GET":
        return jsonify({"hardwareData": Hardware.get_all_hardware()}), 200
    else:
        try:
            return jsonify({"projectData": Hardware.update_hardware(request.json)}), 200
        except Exception as e:
            if str(e) == "Invalid Amount":
                return jsonify({"message": str(e)}), 403
            else:
                return jsonify({"message": str(e)}), 500


@app.route("/api/hardware/<id>/", methods = ["GET"])
def handle_specific_hardware(id: str):
    hardware = Hardware(id=id)
    return jsonify({"hardwareData": hardware.get_hardware()}), 200


# @app.route("/updateProjects/", methods = ["PUT"])
# def update_projects():
#     new_projects = request.json['projects']
#     for project in new_projects:
#         projectName = project["projectName"]
#         document = project_db.find({"projectName": projectName})[0]
#         document["hardwares"] = project['hardwares']
#         project_db.update_one({"projectName": projectName}, {"$set":document})

#     # return jsonify({"message": "Updated Successfully"}), 200
#     return get_projects()

# validate units used is less than capacity and updates
# @app.route("/updateHardwareCount/", methods = ["PUT"])
# def update_Hardware_Count():
#     hardwareName = request.json["hardwareName"]
#     unitsUsed = request.json['unitSum']
#     document = db.find({'name': hardwareName})[0]
#     # print(request.json)
#     capacity = document['capacity']
#     if unitsUsed < capacity:
#         document['unitsUsed'] = unitsUsed
#         db.update_one({"name": hardwareName}, {"$set":document})
#         return jsonify({"message": "Created Successfully"}), 200
#         # return jsonify({get_articles()}), 200
#     else:
#         return jsonify({"message": "Unsuccessful"}), 403
#     # return get_projects()



if __name__ == "__main__":
    init_db()
    app.config.update(
        SESSION_COOKIE_HTTPONLY=False,
    )
    app.secret_key = environ.get("SECRET_KEY")
    app.run(debug=True, load_dotenv=True)

