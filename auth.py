from flask import request, jsonify, session
from functools import wraps
from marshmallow import Schema, fields, post_load
import database
import bcrypt


class Auth():
    def __init__(self, uname: str, password: str):
        self.uname = uname
        self.password = password

    def login(self):
        record = database.client.users.find_one({'uname': self.uname})
        if record is None:
            raise Exception("No Account")
        elif bcrypt.checkpw(self.password.encode('utf-8'), record["password"]):
            session["uid"] = str(record["_id"])
            return True, self.uname
        else:
            return False, None
        
    @staticmethod
    def logout():
        if "uid" in session:
            session.pop("uid")

    def signup(self):
        record = database.client.users.find_one({'uname': self.uname})
        if record is not None:
            raise Exception("User Exists")
        else:
            hashed = bcrypt.hashpw(self.password.encode('utf-8'), bcrypt.gensalt())
            result = database.client.users.insert_one({"uname": self.uname, "password": hashed})
            session["uid"] = str(result.inserted_id)
            return self.uname
        


def check_auth(f):
    @wraps(f)
    def wrap(*args,**kwargs):
        if "uid" not in session:
            return jsonify({'message': 'Not logged in'}), 400
        else:
            request.user = session["uid"]
        return f(*args, **kwargs)
    return wrap

class UserSchema(Schema):
    id = fields.Str(attribute='_id')
    uname = fields.Str()

    @post_load
    def make_project_load(self, data, **kwargs):
        return User(**data)

class User():
    def __init__(self, id = "", uname = ""):
        self.id = id
        self.uname = uname

    @staticmethod
    def get_users(query: str):
        users = database.client.users.find(filter={
            "$text":{
                "$search": query
            }
        }).limit(5)

        return UserSchema(many=True).dump(users)