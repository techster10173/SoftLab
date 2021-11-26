from marshmallow import Schema, fields, post_load
from datetime import datetime
import database
from bson.objectid import ObjectId
from auth import UserSchema

class Project:
    def __init__(self, id: str = "", dateCreated: datetime = None, dateUpdated: datetime = None, 
        creator:str = "", hardwares:dict = {}, projectName:str = "", funds:float = 0.0, description:str = "", members:list = []):
        if id != "":
            self.id = ObjectId(id)
        else:
            self.id = ObjectId()
        self.projectName = projectName
        if creator != "":
            self.creator = ObjectId(creator)
        else:
            self.creator = ObjectId()
        self.hardwares = hardwares
        self.funds = funds
        self.description = description
        self.dateCreated = dateCreated
        self.dateUpdated = dateUpdated
        self.members = members

    def _get_roles(self):
        project = database.client.projects.find_one(filter={'_id': self.id}, projection={'creator': 1, 'members': 1})
        if project["creator"] == self.creator:
            return "creator"
        elif self.creator in [ObjectId(member) for member in project["members"]]:
            return "editor"
        else:
            return "viewer"

    def create_project(self):
        self.dateCreated = datetime.now()
        self.dateUpdated = datetime.now()
        del self.id
        database.client.projects.insert_one(self.__dict__)

    def update_project(self):
        self.dateUpdated = datetime.now()
        del self.dateCreated
        role = self._get_roles()
        if role == "creator" or role == "editor":
            database.client.projects.update_one({'_id': self.id}, {'$set': self.__dict__})
        else:
            raise Exception("User Lacks Permissions")

    def delete_project(self):
        project = self.get_project()
        role = self._get_roles()

        if role == "creator" or role == "editor":
            database.client.projects.delete_one({'_id': self.id})

            for hardware_name in project["hardwares"]:
                database.client.hardwares.update_one({'name': hardware_name}, {'$inc': {'unitsUsed': ((project["hardwares"][hardware_name]) * -1)}})
        else:
            raise Exception("User Lacks Permissions")
        return project

    def get_project(self):
        project = database.client.projects.find_one({'_id': self.id})
        project_obj = ProjectSchema().dump(project)
        if ObjectId(project_obj["creator"]) == self.creator or self.creator in [ObjectId(member) for member in project_obj["members"]]:
            return project_obj
        else:
            raise Exception("User Lacks Permissions")

    def set_users(self):
        role = self._get_roles()
        if role != "creator":
            raise Exception("User Lacks Permissions")
        
        if len(self.members) > 20:
            raise Exception("Too many members")

        members = [ObjectId(member) for member in self.members]
        database.client.projects.update_one({'_id': self.id}, {'$set': {'members': members}})

    def get_users(self):
        role = self._get_roles()

        if role != "creator":
            users = database.client.projects.aggregate([
                {'$match': {'_id': self.id}},
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'members',
                        'foreignField': '_id',
                        'as': 'users'
                    }
                },
                {'$project': {
                    "_id": 0,
                    'users._id': 1,
                    'users.uname': 1,
                }}
            ])

            users = [user["users"] for user in users][0]
            return UserSchema(many=True).dump(users)
        else:
            raise Exception("User Lacks Permissions")

    def get_projects(self, offset: int):
        query = [
            {
                "$match": {
                    "$or": [
                        {"creator": self.creator},
                        {"members": self.creator}
                    ],
                },
                
            },
            {
                "$skip": 10*offset
            },
            {
                "$limit": 10
            },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'creator',
                    'foreignField': '_id',
                    'as': 'creator'
                }
            },
            {
                "$unwind": "$creator"
            },
            {
                "$project": {
                    "_id": 1,
                    "projectName": 1,
                    "funds": 1,
                    "description": 1,
                    "dateCreated": 1,
                    "dateUpdated": 1,
                    "creator": "$creator.uname"
                }
            }
        ]

        count_query = {
            "$or": [
                {"creator": self.creator},
                {"members": self.creator}
            ],
        }
           

        items = database.client.projects.aggregate(query)
        return ProjectSchema(many=True).dump(items), database.client.projects.count_documents(count_query)


class ProjectSchema(Schema):
    id = fields.Str(attribute='_id')
    projectName = fields.Str()
    creator = fields.Str()
    hardwares = fields.Dict(fields.Str(), fields.Int())
    funds = fields.Float()
    description = fields.Str()
    dateCreated = fields.DateTime()
    dateUpdated = fields.DateTime()
    members = fields.List(fields.Str())

    @post_load
    def make_project_load(self, data, **kwargs):
        return Project(**data)