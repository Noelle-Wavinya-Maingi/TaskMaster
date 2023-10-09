import os
from datetime import timedelta
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager


app = Flask(__name__)
api = Api(app)


app.config["SECRET_KEY"] = '33f334a749dd2e8216f245b0bb263aea'
app.config['JWT_SECRET_KEY'] = 'b99ce1e67619ed6f9dd29211ec08e559'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days = 30)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(minutes = 15)

db = SQLAlchemy(app)

migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
