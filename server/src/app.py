from flask import Flask

from database import init_db
from auth import check_token

app = Flask(__name__)


if __name__ == '__main__':
    init_db()
    app.run(debug=True, load_dotenv=True)
