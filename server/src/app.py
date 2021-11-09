from flask import Flask, request, jsonify, session
from auth import Auth
from database import init_db
from Models.project import ProjectSchema, Project
from auth import check_auth
from os import environ
import bcrypt

app = Flask(__name__)

@app.route('/api/auth', methods=["GET", "POST"])
def handle_auth():
    json_data = request.get_json()
    auth_handler = Auth(json_data["uname"], json_data["pass"])

    if request.method == "POST":
        try:
            auth_handler.signup()
            return jsonify({"message": "Signed Up!"}), 200
        except Exception as e:
            if str(e) == "User Exists":
                return jsonify({"message": str(e)}), 409
            else:
                print(e)
                return jsonify({"message": "Internal Server Error"}), 500
    else:
        try:
            if auth_handler.login():
                return jsonify({"message": "Logged In!"}), 200
            else:
                return jsonify({"message": "Invalid Credentials"}), 405
        except Exception as e:
            if str(e) == "No Account":
                return jsonify({"message": str(e)}), 409
            else:
                print(e)
                return jsonify({"message": "Internal Server Error"}), 500
            

@app.route("/api/auth/signout", methods=["POST"])
@check_auth
def handle_signout():
    json_data = request.get_json()
    auth_handler = Auth(json_data["uname"], json_data["pass"])
    auth_handler.logout()
    return jsonify({"message": "Logged Out!"}), 200


@app.route('/api/projects/<pid>/', methods=('GET', 'PUT', 'DELETE'))
@check_auth
def handleSpecificProject(pid: str):
    schema = ProjectSchema()
    if request.method == 'GET':
        project = Project(pid)
        try:
            project_data = project.get_project()
            return jsonify({"projectData": project_data}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 403
    elif request.method == 'PUT':
        project = schema.load(request.json, partial=True, unknown="INCLUDE")
        project.id = pid
        try:
            project.update_project()
            return jsonify({"message": "Project Updated"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 403
    elif request.method == 'DELETE':
        project = Project(pid)
        try:
            return jsonify({"projectData": project.delete_project()}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 403

@app.route('/api/projects/', methods=('GET', 'POST'))
@check_auth
def handleProjects():
    schema = ProjectSchema()
    if request.method == 'GET':
        if request.args.get('offset') is None:
            return jsonify({"message": "Missing Offset"}), 400
        project_data = Project.get_projects(int(request.args.get('offset')), request.user)            
        return jsonify({"projectData": project_data}), 200
    elif request.method == 'POST':
        project = schema.load(request.json, partial=True, unknown="INCLUDE")
        project.create_project(request.user)
        return jsonify({"message": "Created Successfully"}), 201

if __name__ == "__main__":
    init_db()
    app.secret_key = environ.get("SECRET_KEY")
    app.run(debug=True, load_dotenv=True)

