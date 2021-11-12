from bson.objectid import ObjectId
from marshmallow import Schema, fields, post_load, post_dump
from Models.project import Project
import database

class Hardware():
    def __init__(self, name = "", capacity = 0, unitPrice = 0.0, unitsUsed = 0):
        self.name = name
        self.capacity = capacity
        self.unitPrice = unitPrice
        self.unitsUsed = unitsUsed
    
    def get_hardware(self):
        hardware = database.client.hardwares.find_one({'_id': self.id})
        return HardwareSchema().dump(hardware)

    @staticmethod
    def get_all_hardware():
        hardware = database.client.hardwares.find()
        return HardwareSchema(many=True).dump(hardware)

    @staticmethod
    def update_hardware(json_data):
        hardwareName = json_data["hardwareName"]
        unitsUsed = json_data['unitSum']
        hardware_document = HardwareSchema().dump(database.client.hardwares.find_one({"name": hardwareName}))
        if unitsUsed < hardware_document["capacity"]:
            hardware_document["unitsUsed"] = unitsUsed
            database.client.hardwares.update_one({"name": hardwareName}, {"$set": hardware_document})
            
            creator = None
            new_projects = json_data['projectsDelta']

            for pid, delta_val in new_projects.items():
                key = "hardwares." + hardwareName
                delta = {}
                delta[key] = delta_val
                database.client.projects.update_one({"_id": ObjectId(pid)}, {"$inc": delta})
                if creator is None:
                    creator = database.client.projects.find_one({"_id": ObjectId(pid)})["creator"]
            return Project.get_projects(0, creator)
        else:
            raise Exception("Invalid Amount")

class HardwareSchema(Schema):
    name = fields.Str()
    capacity = fields.Int()
    unitPrice = fields.Float()
    unitsUsed = fields.Int()

    @post_load
    def make_project_load(self, data, **kwargs):
        return Hardware(**data)