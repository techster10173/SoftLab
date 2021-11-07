import firebase_admin
from flask import request, jsonify
from functools import wraps

firebase = firebase_admin.initialize_app()

def check_token(f):
    @wraps(f)
    def wrap(*args,**kwargs):
        if not request.headers.get('authorization'):
            return jsonify({'message': 'No token provided'}), 400
        try:
            user = firebase_admin.auth.verify_id_token(request.headers['authorization'])
            request.user = user.uid
        except:
            return jsonify({'message':'Invalid token provided.'}), 400
        return f(*args, **kwargs)
    return wrap