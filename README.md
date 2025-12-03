 ## TaskFlow – A Scalable Task Management Web Application

 ## A full-stack MERN-style (PostgreSQL + Express + React + Node) assignment project

## Overview

TaskFlow is a personal task-management web application built as part of my scalable web application development assignment.
The goal of this project was to design and implement a secure, scalable, and user-friendly full-stack system with authentication, CRUD operations, and role-based protected routes.

The project demonstrates my understanding of:

Backend API design using Node.js + Express

Database modeling using PostgreSQL

Secure authentication with JWT

Clean routing, controllers, middleware, and validations

A responsive frontend using React (Vite)

State & Auth management using Context API

REST API integration with Axios

Reusable components & clean UI layouts

## Features
User Authentication

Register new users

Login with JWT-based authentication

Secure protected routes

Auto-login using stored token

Logout & session clearing

## Task Management

Create a new task

View all tasks with:

Search

Status filters

Priority filters

Pagination

Edit an existing task

Delete a task

## User Dashboard

Display total tasks

Completed, in-progress, pending breakdown

A clean and minimal UI

## Backend Architecture

The backend is structured around:

routes/ – clean API endpoints

controllers/ – business logic

middleware/ – JWT auth, validation, error handling

models/ – database operations

utils/ – reusable helpers

Everything is modular and scalable.
## Tech Stack
Frontend

React (Vite)

React Router

Bootstrap + React Bootstrap

Formik + Yup

Axios

Backend

Node.js

Express.js

PostgreSQL (pg)

JSON Web Tokens (JWT)

bcryptjs

## Database Structure
Users Table

id

full_name

email

password_hash

created_at

last_login

Tasks Table

id

user_id (FK)

title

description

status

priority

due_date

created_at

updated_at

## API Endpoints
## Auth Routes (/api/auth)
Method	Endpoint	Description
POST	/register	Register user
POST	/login	Login user
GET	/verify	Verify JWT token
##  User Routes (/api/user)
Method	Endpoint	Description
GET	/profile	Get user profile
PUT	/profile	Update profile
GET	/stats	Get user task statistics
##  Task Routes (/api/tasks)
Method	Endpoint	Description
GET	/	Get all tasks
GET	/:id	Get single task
POST	/	Create task
PUT	/:id	Update task
DELETE	/:id	Delete task
## Learning Outcomes

Through this project, I understood:

How to design real-world APIs

How authentication works internally

How to protect routes on frontend + backend

Handling form validation with Yup & Formik

Axios interceptors for token management

Implementing middleware-based architecture

Structuring a scalable codebase

This project helped me bridge the gap between academic concepts and real industry-standard development.

## How to Run the Project
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev
