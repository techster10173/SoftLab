from flask import Flask

from auth import check_token

app = Flask(__name__)

#@app.route('/api/userinfo')
#@check_token
#def userinfo():
    #return {'data': users}, 200