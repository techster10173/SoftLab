import firebase_admin
from flask import request
from functools import wraps

cred = firebase_admin.credentials.Certificate('../softlab-6e579-firebase-adminsdk-ms1dc-03c667f3d7.json')
firebase = firebase_admin.initialize_app(cred)

def check_token(f):
    @wraps(f)
    def wrap(*args,**kwargs):
        if not request.headers.get('authorization'):
            return {'message': 'No token provided'},400
        try:
            user = firebase_admin.auth.verify_id_token(request.headers['authorization'])
            request.user = user
        except:
            return {'message':'Invalid token provided.'},400
        return f(*args, **kwargs)
    return wrap