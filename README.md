# Online Course Management Portal – Frontend

This is the **frontend** of the Online Course Management Portal built with **React.js** using **Vite** for fast development and build times.  
It provides user-facing pages such as **Register**, **Login**, **Course List**, **Course Detail**, **Student Dashboard**, and **Admin Dashboard**.  
Authentication is handled via **JWT** and API calls are made to the backend (Spring Boot) using **Axios**.

---

## 🚀 Features

- Modern **React.js (Vite)** frontend
- **JWT authentication** and route protection
- **Responsive UI** with Material-UI/Custom CSS
- Course catalog with filters and search
- Student and Admin dashboards
- Mock payment integration for enrollments
- API service layer for backend communication

---

## 📦 Tech Stack

- **Frontend Framework:** React.js (Vite)
- **UI Components:** Material-UI (MUI) / Custom CSS
- **Routing:** React Router DOM
- **HTTP Requests:** Axios
- **State Management:** React Hooks / Context API
- **Authentication:** JWT (JSON Web Token)

---

## 📂 Project Structure

frontend/
│
├── public/ # Static files
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page components (Login, Register, etc.)
│ ├── services/ # API call functions (Axios)
│ ├── App.jsx # Root app component
│ ├── main.jsx # Entry point
│ └── styles/ # CSS files
│
├── .env # Environment variables
├── package.json
├── vite.config.js
└── README.md
