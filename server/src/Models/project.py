from marshmallow import Schema, fields, post_load
from datetime import datetime
import database
from bson.objectid import ObjectId

class Project:
    def __init__(self, id: str = "", creator:str = "", editors:list = [], viewers:list = [], hardwares:dict = {}, projectName:str = "", funds:float = 0.0, description:str = ""):
        self.id = ObjectId(id)
        self.projectName = projectName
        self.creator = creator
        self.editors = editors
        self.viewers = viewers
        self.hardwares = hardwares
        self.funds = funds
        self.description = description

    def create_project(self, creator_uid: str):
        self.dateCreated = datetime.now()
        self.dateUpdated = datetime.now()
        self.creator = creator_uid
        del self.id
        database.client.projects.insert_one(self.__dict__)

    def update_project(self):
        self.dateUpdated = datetime.now()
        document = database.client.projects.find_one({'_id': self.id})
        if self.creator in document['editors'] or self.creator == document['creator']:
            database.client.projects.update_one({'_id': self.id}, {'$set': self.__dict__})
        else:
            raise Exception("User Lacks Permissions")

    def delete_project(self):
        project = None
        try:
            project = self.get_project()
        except Exception as e:
            return e
            
        if self.creator in project['editors'] or self.creator == project['creator']:
            database.client.projects.delete_one({'_id': self.id})
        else:
            raise Exception("User Lacks Permissions")
        return project

    def get_project(self):
        project = database.client.projects.find_one({'_id': self.id})
        project_obj = ProjectSchema.dump(project)
        if project_obj.creator == self.creator or self.creator in project_obj.editors or self.creator in project_obj.viewers:
            return project_obj
        else:
            raise Exception("User Lacks Permissions")

    @staticmethod
    def get_projects(offset: int, creator: str):
        query = {
            "$or": [
                {"creator": creator},
                {"editors": {"$in": [creator]}},
                {"viewers": {"$in": [creator]}}
            ]
        }
        items = database.client.projects.find(query).skip(offset).limit(10)
        return ProjectSchema(many=True).dump(items)

class ProjectSchema(Schema):
    id = fields.Str(attribute='_id')
    projectName = fields.Str()
    creator = fields.Str()
    editors = fields.List(fields.Str())
    viewers = fields.List(fields.Str())
    hardwares = fields.Dict(fields.Str(), fields.Int())
    funds = fields.Float()
    description = fields.Str()
    dateCreated = fields.DateTime()
    dateUpdated = fields.DateTime()

    @post_load
    def make_project(self, data, **kwargs):
        return Project(**data)