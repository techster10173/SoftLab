from flask import Flask, request, jsonify, send_from_directory
from Models.hardware import Hardware
from auth import Auth, User
from database import init_db
from Models.project import ProjectSchema, Project
from auth import check_auth
from os import environ
from bson.objectid import ObjectId
from dotenv import load_dotenv

app = Flask(__name__, static_folder="frontend/build", static_url_path="")

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

@app.route("/api/users/", methods=["GET"])
@check_auth
def handle_users():
    if request.args.get('query') is None:
            return jsonify({"message": "Missing Query"}), 400
    users = User.get_users(request.args.get('query'))
    respObject = jsonify({"users": users})
    return respObject, 200


@app.route('/api/projects/<pid>/invite/', methods=["PUT", "GET"])
@check_auth
def handle_invite(pid):
    project = Project(id=pid, creator=request.user)

    if request.method == "PUT":
        json_data = request.get_json()
        project.members = json_data["members"]

        try:
            project.set_users()
            return jsonify({"message": "Invited!"}), 200
        except Exception as e:
            if str(e) == "User Lacks Permissions":
                return jsonify({"message": str(e)}), 403
            else:
                print(e)
                return jsonify({"message": str(e)}), 500
    else:
        try:
            return jsonify({"users": project.get_users()}), 200
        except Exception as e:
            if str(e) == "User Lacks Permissions":
                return jsonify({"message": str(e)}), 403
            else:
                print(e)
                return jsonify({"message": str(e)}), 500


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
        project.creator = ObjectId(request.user)
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
        project = Project(creator=request.user)
        project_data, count = project.get_projects(int(request.args.get('offset')))            
        return jsonify({"projectData": project_data, "totalProjects": count}), 200
    elif request.method == 'POST':
        project = schema.load(request.json)
        project.creator = ObjectId(request.user)
        project.create_project()
        return jsonify({"message": "Created Successfully"}), 201


# TODO handle authorization versus server errors
@app.route("/api/hardware/", methods = ("GET", "PUT"))
def handle_hardware():
    if request.method == "GET":
        if request.args.get('offset') is None:
            return jsonify({"message": "Missing Offset"}), 400
        hardware_data, count = Hardware.get_all_hardware(int(request.args.get('offset')))
        return jsonify({"hardwareData":hardware_data, "totalHardware": count}), 200
    else:
        try:
            return jsonify({"projectData": Hardware.update_hardware(request.json)}), 200
        except Exception as e:
            if str(e) == "Invalid Amount":
                return jsonify({"message": str(e)}), 400
            else:
                return jsonify({"message": str(e)}), 500


@app.route("/api/hardware/<id>/", methods = ["GET"])
def handle_specific_hardware(id: str):
    hardware = Hardware(id=id)
    return jsonify({"hardwareData": hardware.get_hardware()}), 200

@app.errorhandler(404)
def catch_all(element):
    return send_from_directory(app.static_folder, "index.html")

load_dotenv()
init_db()

app.config.update(
    SESSION_COOKIE_HTTPONLY=False,
    SECRET_KEY=environ.get("SECRET_KEY")
)

if __name__ == '__main__':
    app.run(host='0.0.0.0')

