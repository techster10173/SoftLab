from flask import Flask, request, jsonify
from database import init_db
from Models.project import ProjectSchema, Project
from auth import check_token

app = Flask(__name__)

@app.route('/api/projects/<pid>/', methods=('GET', 'PUT', 'DELETE'))
@check_token
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
@check_token
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
    app.run(debug=True, load_dotenv=True)
    