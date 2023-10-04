from myapp import api, db, bcrypt
from flask import request, jsonify,make_response
from myapp.models import User, Task_List
from flask_restful import Resource
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required

# task_lists = []


class UserRegistrationResource(Resource):
    def post(self):
        if request.is_json:
            try:
                data = request.get_json()
                username = data.get("username")
                email = data.get("email")
                password = data.get("password")

                if not username or not email or not password:
                    return {"message": "Missing required fields"}, 400

                # Check if the username already exists
                existing_user = User.query.filter_by(username=username).first()
                if existing_user:
                    return {"message": "Username already exists"}, 400

                existing_email = User.query.filter_by(email=email).first()
                if existing_email:
                    return {"message": "Email already exists"}, 400

                # Hash the password using Flask-Bcrypt
                hashed_password = bcrypt.generate_password_hash(password).decode(
                    "utf-8"
                )

                # Create a new user
                new_user = User(
                    username=username, email=email, password=hashed_password
                )

                # Add the user to the database
                db.session.add(new_user)
                db.session.commit()

                return {"message": "User registered successfully"}, 201
            except Exception as e:
                return {"message": str(e)}, 500
        else:
            return {"message": "Request Content-Type must be 'application/json'"}, 400

class UserLoginResource(Resource):
    def post(self):
        if request.is_json:
            try:
                data = request.get_json()
                username = data.get("username")
                password = data.get("password")

                if not username or not password:
                    return {"message": "Missing required fields."}
                
                user = User.query.filter_by(username = username).first()

                if not user:
                    return {"message": "User not found!"}, 404

                if bcrypt.check_password_hash(user.password, password):
                    access_token = create_access_token(identity = user.id)

                    refresh_token = create_refresh_token(identity = user.id)

                    return {"message": "Login Successful", "access_token" : access_token, "refresh_token": refresh_token}, 200
                
                else:
                    return {"message": "Invalid Login!"}, 401
                
            except Exception as e:
                return {"message": str(e)}, 500

        else:
            return {"message": "Request Content-Type must be 'application/json'"}, 400


class TaskLists(Resource):
    @jwt_required()
    def get(self):
        try:
            current_user_id = get_jwt_identity()

            task_lists = Task_List.query.filter_by(user_id=current_user_id).all()

            task_lists_data = []

            for task_list in task_lists:
                task_list_data = {
                    "id" : task_list.id,
                    "title" : task_list.title,
                    "description" : task_list.description,
                    "user_id" : task_list.user_id,
                }
                task_lists_data.append(task_list_data)

                response_dict = {"message" : "Task lists retrieved successfully", "task_lists" : task_lists_data,}

                response = make_response(jsonify(response_dict), 200)

        except Exception as e:
            response_dict = {"errors" : str(e)}

            response = make_response(jsonify(response_dict), 500)

        return response
    

    @jwt_required()
    def post(self):
        try:
            # Get the current user's identity from the JWT
            current_user_id = get_jwt_identity()

            # Parse JSON data from the request body
            data = request.get_json()
            title = data.get("title")
            description = data.get("description")

            if not title:
                response_dict = {"errors": ["Title is required"]}
                return make_response(jsonify(response_dict), 400)

            # Create a new TaskList instance
            task_list = Task_List(
                title=title,
                description=description,
                user_id=current_user_id
            )

            # Add and commit the new TaskList to the database
            db.session.add(task_list)
            db.session.commit()

            # Serialize and return the created TaskList data
            response_dict = {
                "message": "Task list created successfully",
                "task_list": {
                    "id": task_list.id,
                    "title": task_list.title,
                    "description": task_list.description,
                    "user_id": task_list.user_id
                }
            }

            response = make_response(jsonify(response_dict), 201)  # Use 201 Created status code

        except Exception as e:
            # Handle any exceptions that may occur during the creation process
            response_dict = {"errors": ["An error occurred: " + str(e)]}
            return make_response(jsonify(response_dict), 500)

        return response


    



# Specify that only POST requests are allowed for this route
api.add_resource(UserRegistrationResource, "/register")
api.add_resource(UserLoginResource, "/login")
api.add_resource(TaskLists, '/tasklist')

