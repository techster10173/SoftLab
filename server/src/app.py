from flask import Flask

from database import init_db
from auth import check_token

app = Flask(__name__)

#@app.route('/api/userinfo')
#@check_token
#def userinfo():
    #return {'data': users}, 200    init_db()
    app.run(debug=True, load_dotenv=True)
    