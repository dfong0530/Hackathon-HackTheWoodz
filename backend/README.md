# Hack_The_Woodz_Backend

## To run this project:
Install latest version of python

Open up new terminal/command prompt

cd backend

"python -m venv myenv" "myenv\Scripts\activate.bat" "pip install -r requirements.txt" "python manage.py migrate" "python manage.py runserver"

the api can now be accessed at "http://127.0.0.1:8000/"

## Main endpoints for testing:

### `/projects/`
View projects

### `/create/`
Create projects
requires 'username', 'password', 'title', 'long_description', 'short_description', 'contributions', and 'thumbnail' (image file) in the body of the request.

### `/delete_project/`
To delete a specific project
requires 'uername', 'password', 'title' (of target project) in the body of the request and only works if the credentials match the creator of the project

### `/view_project/`
To view a specific project
requires a 'title' parameter in the url (Ex: /view_project/?title=<project title>)

### `/log_in/`
The endpoint for the user login page
requires 'username', 'password' in the body of the request.

### `/users/`
View a list of accounts

### `/profile/`
To view a list of projects associate with a user
requires a 'username' parameter in the url (Ex: /profile/?username=john)

### `/create_account/`
To get to the page where you can create your account
requires 'first_name', 'job_title', 'username', 'email', 'password' in the body of the request
