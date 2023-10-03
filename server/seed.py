from myapp import app, db
from myapp.models import User, Task, Task_List, Label, TaskLabel
from datetime import datetime

with app.app_context():
    # Clear existing data
    db.session.query(TaskLabel).delete()
    db.session.query(Task).delete()
    db.session.query(Task_List).delete()
    db.session.query(Label).delete()
    db.session.query(User).delete()

    # Create users
    users = [
        User(username="user1", email="user1@example.com", password="password1"),
        User(username="user2", email="user2@example.com", password="password2"),
        User(username="user3", email="user3@example.com", password="password3"),
        User(username="user4", email="user4@example.com", password="password4"),
        User(username="user5", email="user5@example.com", password="password5"),
        User(username="user6", email="user6@example.com", password="password6"),
        User(username="user7", email="user7@example.com", password="password7"),
        User(username="user8", email="user8@example.com", password="password8"),
        User(username="user9", email="user9@example.com", password="password9"),
        User(username="user10", email="user10@example.com", password="password10"),
    ]

    db.session.add_all(users)
    db.session.commit()

    # Create task lists
    task_lists = [
        Task_List(title="Work", description="Work-related tasks", user_id=1),
        Task_List(title="Personal", description="Personal tasks", user_id=1),
        Task_List(title="Groceries", description="Grocery shopping list", user_id=2),
        Task_List(title="Study", description="Study tasks", user_id=3),
        Task_List(title="Home", description="Home improvement tasks", user_id=4),
        Task_List(title="Health", description="Health and fitness tasks", user_id=5),
        Task_List(title="Vacation", description="Vacation planning", user_id=6),
        Task_List(title="Errands", description="Running errands", user_id=7),
        Task_List(title="Project", description="Project tasks", user_id=8),
        Task_List(title="Hobby", description="Hobby-related tasks", user_id=9),
    ]

    db.session.add_all(task_lists)
    db.session.commit()

    # Create labels
    labels = [
        Label(name="Personal"),
        Label(name="Work"),
        Label(name="Home"),
        Label(name="Study"),
        Label(name="Health"),
        Label(name="Shopping"),
        Label(name="Urgent"),
        Label(name="Important"),
        Label(name="Fun"),
        Label(name="Project"),
    ]

    db.session.add_all(labels)
    db.session.commit()

    # Create tasks
    tasks = [
        Task(
            title="Task 1",
            description="Description for Task 1",
            due_date=datetime(2023, 10, 15),
            task_list_id=1,
        ),
        Task(
            title="Task 2",
            description="Description for Task 2",
            due_date=datetime(2023, 10, 20),
            task_list_id=1,
        ),
        Task(
            title="Task 3",
            description="Description for Task 3",
            due_date=datetime(2023, 10, 25),
            task_list_id=2,
        ),
        Task(
            title="Task 4",
            description="Description for Task 4",
            due_date=datetime(2023, 11, 1),
            task_list_id=3,
        ),
        Task(
            title="Task 5",
            description="Description for Task 5",
            due_date=datetime(2023, 11, 5),
            task_list_id=4,
        ),
        Task(
            title="Task 6",
            description="Description for Task 6",
            due_date=datetime(2023, 11, 10),
            task_list_id=5,
        ),
        Task(
            title="Task 7",
            description="Description for Task 7",
            due_date=datetime(2023, 11, 15),
            task_list_id=6,
        ),
        Task(
            title="Task 8",
            description="Description for Task 8",
            due_date=datetime(2023, 11, 20),
            task_list_id=7,
        ),
        Task(
            title="Task 9",
            description="Description for Task 9",
            due_date=datetime(2023, 11, 25),
            task_list_id=8,
        ),
        Task(
            title="Task 10",
            description="Description for Task 10",
            due_date=datetime(2023, 12, 1),
            task_list_id=9,
        ),
    ]

    db.session.add_all(tasks)
    db.session.commit()

    # Create task labels
    task_labels = [
        TaskLabel(task_id=1, label_id=1),
        TaskLabel(task_id=2, label_id=2),
        TaskLabel(task_id=3, label_id=3),
        TaskLabel(task_id=4, label_id=4),
        TaskLabel(task_id=5, label_id=5),
        TaskLabel(task_id=6, label_id=6),
        TaskLabel(task_id=7, label_id=7),
        TaskLabel(task_id=8, label_id=8),
        TaskLabel(task_id=9, label_id=9),
        TaskLabel(task_id=10, label_id=10),
    ]

    db.session.add_all(task_labels)
    db.session.commit()

    print("Data seeded successfully")
