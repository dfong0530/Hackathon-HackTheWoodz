<img width="700" height="300" alt="Screen Shot 2022-06-18 at 11 44 40 PM" src="https://user-images.githubusercontent.com/68403991/174465150-f4037c2b-b81e-46b4-acc9-fd29efa3e378.png">

### Demo Video: https://www.youtube.com/watch?v=aozr4XJpuC0&t=4s 

### Project Link: https://hackathon-my-shelf.netlify.app/

### Inspiration

In software engineering, and in other fields, your personal projects demonstrate you skill level, problem solving abilities, and your knowledge around a specific topic. It is cruicial that you put in your best work as it will be seen by the rest of the world.

Our group wanted to create a platform solely for the purpose of displaying personal projects. Sure there is git hub and devpost. However, these platforms are used for version control/finding hackathons. We wanted to create a platform where the main mission revolves around creating a presentable interface for your projects.

### What it does

MyShelf is website that allows you to display your personal projects. For short, MyShelf is like project-portfolio generator. It supports all operations to add, delete, updated and read projects.

<hr/>

### Technologies Used

Frontend: React.js

Backend: Django, SqlLite DB

### How we built it

We built this webstite with a decoupled React/Django application.
Meta data about the user and their projects are stored on the frontend. When the user clicks on a thumnail in the projects page, data about that individual project is loaded in.

<hr/>

### Problems we ran into

Connecting the frontend to the backend.

Storing image files and retrieving them from the database

Authentication

### What we learned

Frontend - Got to learn more about working with forms in the frontend. Became more comfortable using axios to make requests. Learned how to send images to the backend as well as loading images retrieved from the django API.

Backend - We learned how to make an api using the Django rest framework, as well as how to design our endpoints to handle different types of data in various ways, such as serving media files and updating models.

### Bugs

- Cannot have two of the same names/usernames in the database.
- Cannot add images to live version.
- Cannot change project name once created.
- When creating a new user, the name and job title fields must be capitalized.

<hr/>

### Set up

Download or clone repository

<ins>Frontend</ins>

cd frontend

npm install

npm start

<ins>Backend</ins>

Open up new terminal/command prompt

cd backend

`python -m venv myenv`

`myenv\Scripts\activate.bat`

`pip install -r requirements.txt`

`python manage.py migrate`

`python manage.py runserver`

the api can now be accessed at "http://127.0.0.1:8000/"
