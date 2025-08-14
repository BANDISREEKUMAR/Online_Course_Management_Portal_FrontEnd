# Online_Course_Management_Portal
A full-stack web application that allows students to browse and enroll in online courses, while admins can manage courses and monitor enrollments. The project features secure authentication, role-based access control, and course progress tracking.

---

## 🚀 Features

- **User Authentication:** Student and Admin registration/login with JWT-based security and BCrypt password encryption.
- **Course Catalog:** Browse courses with filtering by category and difficulty level; search by title or instructor.
- **Admin Panel:** Admins can add, update, delete, activate/deactivate courses, and upload course thumbnails and video links (mock).
- **Enrollment & Payment:** Students can enroll in courses after a simulated payment process.
- **Progress Tracking:** Students can track their course progress, including videos watched and quiz scores.

---

## 🛠️ Tech Stack

| Component    | Technology                   |
|--------------|------------------------------|
| Frontend     | React.js, Axios, React Router |
| Backend      | Java 17+, Spring Boot, Spring Security, Spring Data JPA, JWT |
| Database     | MySQL                        |
| Payment      | Mock Payment Integration     |

---

## 📁 Project Structure

online-course-portal/  
├── frontend/   # React.js frontend application  
└── backend/    # Spring Boot backend REST API  

---

## 📦 Setup & Installation

### Backend

1. Navigate to the `backend` folder.
2. Change the RazorPay key and secret in the code fields.
3. Configure your MySQL database and update the `application.properties` with your credentials.
4. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run

