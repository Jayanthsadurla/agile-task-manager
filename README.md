# Agile Task Manager

A full-stack Agile Task Management application built with **React** and **Django REST Framework**.  
This project enables teams to efficiently organize tasks, manage boards, and track progress using an Agile workflow.  
It combines a modern, responsive frontend with a secure, scalable backend API.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Developer](#developer)
- [License](#license)

---

## Overview

**Agile Task Manager** is designed for teams adopting Agile principles such as Kanban and Scrum.  
It helps visualize workflow, assign tasks, and monitor project progress in real time.

Backend APIs are powered by **Django REST Framework**, while the frontend uses **React + Tailwind CSS** for a fast and clean UI.

---

## Features

- Create, update, and delete tasks  
- Manage multiple boards and columns (To Do, In Progress, Done)  
- Assign users to tasks  
- RESTful API integration  
- Authentication and authorization (optional JWT or token-based)  
- Responsive user interface with real-time updates  
- Scalable architecture for deployment

---

## Tech Stack

**Frontend**
- React.js  
- Axios  
- Tailwind CSS  

**Backend**
- Django  
- Django REST Framework  
- SQLite (for development)

**Tools**
- npm  
- pip  
- Virtual Environment (venv)

---

## Project Structure
agile-task-manager/
│
├── agile_backend/ # Django backend (API)
│ ├── agile_backend/ # Django project settings
│ ├── tasks/ # Core app for task management
│ ├── db.sqlite3 # Local database
│ ├── manage.py
│
├── agile-frontend/ # React frontend
│ ├── src/
│ ├── public/
│ ├── package.json
│
├── venv/ # Python virtual environment
└── README.md


---

# Backend Setup

### 1. Navigate to the backend directory
cd agile_backend

### 2. Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # On Windows

source venv/bin/activate     # On Linux/Mac

### 3. Install dependencies
pip install django djangorestframework

### 4. Run migrations
python manage.py migrate

## 5. Start the development server
python manage.py runserver
Your backend will run at:
http://127.0.0.1:8000/

---

## Frontend Setup

## 1. Navigate to the frontend directory
cd agile-frontend
## 2. Install dependencies
npm install
## 3. Start the React app
npm start
Your frontend will run at:
http://localhost:3000/
Ensure the backend is running simultaneously for API calls to succeed.
| Endpoint           | Method | Description              |
| ------------------ | ------ | ------------------------ |
| `/api/tasks/`      | GET    | Retrieve all tasks       |
| `/api/tasks/<id>/` | GET    | Retrieve a specific task |
| `/api/tasks/`      | POST   | Create a new task        |
| `/api/tasks/<id>/` | PUT    | Update an existing task  |
| `/api/tasks/<id>/` | DELETE | Delete a task            |

## Developer

Jayanth Sadurla
B.Tech CSE (Data Science), Class of 2026
Aspiring AI/ML & Full-Stack Developer
Focused on building intelligent, scalable applications that create real-world impact.
