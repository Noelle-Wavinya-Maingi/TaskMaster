from myapp import db
from sqlalchemy_serializer import SerializerMixin


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    image_file = db.Column(db.String, nullable=False)

    # task_lists = db.relationship("Task_List", backref="user", lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"
    
    serialize_rules = ("-task_lists.user",)

class Task_List(db.Model, SerializerMixin):
    __tablename__ = "task_lists"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # tasks = db.relationship("Task", backref="task_list", lazy=True)

    def __repr__(self):
        return f"Task list {self. title} {self.description}"

    serialize_rules = ("-user.task_lists", "-tasks.task_list",)


class Task(db.Model, SerializerMixin):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String)
    due_date = db.Column(db.DateTime)
    updated_on = db.Column(db.DateTime, onupdate=db.func.now())
    completed = db.Column(db.Boolean, default=False)
    task_list_id = db.Column(db.Integer, db.ForeignKey("task_lists.id"), nullable=False)

    # Relationship with Label
    # labels = db.relationship("Label", secondary="task_labels", backref="tasks")

    def __repr__(self):
        return f"Task {self.title} {self.description} {self.completed} {self.due_date}"

    serialize_rules = ("-labels.tasks", "-task_list.tasks",)

class Label(db.Model, SerializerMixin):
    __tablename__ = "labels"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True)

    # Relationship with Task
    # tasks = db.relationship("Task", secondary="task_labels", backref="task_labels")

    def __repr__(self):
        return f"Label {self.name}"

    serialize_rules = ("-tasks.labels",)

class TaskLabel(db.Model, SerializerMixin):
    __tablename__ = "task_labels"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    task_id = db.Column(db.Integer, db.ForeignKey("tasks.id"))
    task = db.relationship("Task", backref=db.backref("task_labels", lazy=True))

    label_id = db.Column(db.Integer, db.ForeignKey("labels.id"))
    label = db.relationship("Label", backref=db.backref("task_labels", lazy=True))

    def __repr__(self):
        return f"TaskLabel {self.task.title} - {self.label.name}"

    serialize_rules = ("-task.task_labels", "-label.task_labels",)
