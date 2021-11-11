from flask import request, jsonify, session
from functools import wraps
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
            return True
        else:
            return False
        
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
        


def check_auth(f):
    @wraps(f)
    def wrap(*args,**kwargs):
        if "uid" not in session:
            return jsonify({'message': 'Not logged in'}), 400
        else:
            request.uid = session["uid"]
        return f(*args, **kwargs)
    return wrap