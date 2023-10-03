from myapp import db
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    __tablename__ = "Users"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique = True, nullable = False)
    email = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(255), nullable = False)
    image_file = db.Column(db.String, nullable = False, default = "default.jpg")
    
    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"
    
class Task(db.Model, SerializerMixin):
    pass

class Task_List(db.Model, SerializerMixin):
    pass
