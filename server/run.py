from myapp import app, db, routes
from myapp.models import User, Task, Task_List, Label, TaskLabel

if __name__ == "__main__":
    app.run(debug=True)