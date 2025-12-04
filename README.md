# GDGC Profile Member Showcase

A full-stack Web Application built as per GDGC Task requirements, featuring a creative UI (inspired by Discord's Crimson Theme), member profile cards, ability to search and filter, light/dark mode and a Node.js backend API.


## Project Structure
```plpgsql
GDGC_Task/
│
├── backend/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```


## Features

-Splash Screen

• Shows app name + logo.
• Short animation.
• Auto-redirects to the main page.


-Member Cards Grid

Displays member:
• Photo
• Name
• Role
• Skills
• Location
• Bio


-Search & Filtering

Search by name or bio
Filters:
• Role
• Skill
• Location

-Toggle Light/Dark Mode

-API Integration

-Deployment ready

## How to run Locally?

1. Backend setup

Inside /backend
```bash
npm install
npm start
```
It will say:
"GDGC Members API running on http://localhost:5000"

- Backend Endpoints:

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| GET    | `/`            | API Health Check           |
| GET    | `/members`     | Returns all members        |
| GET    | `/members/:id` | Returns single member data |


2. Frontend Setup

Open
```bash
GDGC_Task/frontend/index.html
```
Or use Live Server extension in VS Code


## Technologies used

Frontend
• HTML5
• CSS3
• Vanilla JavaScript
• Dynamic content rendering using DOM API

Backend
• Node.js
• Express.js
• CORS enabled

## Requirement Checklist

| Requirement                            | Status |
| -------------------------------------- | :----: |
| Splash screen with animation           |    ✅   |
| Member cards with full details         |    ✅   |
| Search functionality                   |    ✅   |
| Filters (role + skill + location)      |    ✅   |
| Light/Dark mode with stored preference |    ✅   |
| Fetch data from backend `/members`     |    ✅   |
| Loading & Error states                 |    ✅   |
| Deployment Supported                   |    ✅   |


## Author

GDGC Task Project
Created by: Simrandeep Singh
