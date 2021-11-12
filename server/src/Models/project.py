from marshmallow import Schema, fields, post_load, post_dump
from datetime import datetime
import database
from bson.objectid import ObjectId

class Project:
    def __init__(self, id: str = "", dateCreated: datetime = None, dateUpdated: datetime = None, creator:str = "", hardwares:dict = {}, projectName:str = "", funds:float = 0.0, description:str = ""):
        if id != "":
            self.id = ObjectId(id)
        else:
            self.id = id
        self.projectName = projectName
        self.creator = creator
        self.hardwares = hardwares
        self.funds = funds
        self.description = description
        self.dateCreated = dateCreated
        self.dateUpdated = dateUpdated

    def create_project(self):
        self.dateCreated = datetime.now()
        self.dateUpdated = datetime.now()
        del self.id
        database.client.projects.insert_one(self.__dict__)

    def update_project(self):
        self.dateUpdated = datetime.now()
        document = self.get_project()
        if self.creator == document["creator"]:
            database.client.projects.update_one({'_id': self.id}, {'$set': self.__dict__})
        else:
            raise Exception("User Lacks Permissions")

    def delete_project(self):
        project = None
        try:
            project = self.get_project()
        except Exception as e:
            return e
            
        if self.creator == project["creator"]:
            database.client.projects.delete_one({'_id': self.id})
        else:
            raise Exception("User Lacks Permissions")
        return project

    def get_project(self):
        project = database.client.projects.find_one({'_id': self.id})
        project_obj = ProjectSchema().dump(project)
        if project_obj["creator"] == self.creator:
            return project_obj
        else:
            raise Exception("User Lacks Permissions")

    @staticmethod
    def get_projects(offset: int, creator: str):
        query = {
            "creator": creator,
        }

        items = database.client.projects.find(query).skip(offset * 10).limit(10).sort("dateCreated", -1)
        return ProjectSchema(many=True).dump(items), database.client.projects.count_documents(query)

class ProjectSchema(Schema):
    id = fields.Str(attribute='_id')
    projectName = fields.Str()
    creator = fields.Str()
    hardwares = fields.Dict(fields.Str(), fields.Int())
    funds = fields.Float()
    description = fields.Str()
    dateCreated = fields.DateTime()
    dateUpdated = fields.DateTime()

    @post_load
    def make_project_load(self, data, **kwargs):
        return Project(**data)