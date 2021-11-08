import firebase_admin
from flask import request, jsonify
from functools import wraps
from firebase_admin import auth, credentials
from os import environ

firebase = None

def init_firebase():
    global firebase
firebase = firebase_admin.initialize_app()

def check_token(f):
    @wraps(f)
    def wrap(*args,**kwargs):
        global firebase
        if not request.headers.get('authorization'):
            return jsonify({'message': 'No token provided'}), 400
        try:
            user = auth.verify_id_token(request.headers.get('authorization'))
            request.user = user["uid"]
        except Exception as e:
            print(str(e))
            return jsonify({'message':'Invalid token provided.'}), 400
        return f(*args, **kwargs)
    return wrap