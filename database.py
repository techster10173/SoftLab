from pymongo import MongoClient
from os import environ

client = None
def init_db():
    global client
    print("Initializing database...")
    client = MongoClient(environ.get('MONGO_URI'))
    client = client.get_database(name='EE461L')