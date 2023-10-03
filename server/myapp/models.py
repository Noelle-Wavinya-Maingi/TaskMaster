from myapp import db
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique = True, nullable = False)
    email = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(255), nullable = False)
    image_file = db.Column(db.String, nullable = False, default = "default.jpg")

    task_lists = db.relationship('Task_List', backref = 'user', lazy = True)
    
    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"
    
class Task_List(db.Model, SerializerMixin):
    __tablename__ = 'task_lists'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)

    tasks = db.relationship('Task', backref = 'task_lists', lazy = True)

    def __repr__(self):
        return f"Task list {self. title} {self.description}"

class Task(db.Model, SerializerMixin):
    pass

