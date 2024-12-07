# **IRCTC**

## **Project Overview**
The Railway Management System is a web application designed to simulate the functionality of a platform similar to IRCTC. It allows users to check train availability, book seats, and view their bookings. The system also includes role-based access controls, where admins can manage train details, and users can interact with train-related functionalities. The system is built to handle simultaneous bookings with proper synchronization to prevent race conditions.

---

## **Features**

### **User Features**
- **User Registration**: Register as a user or admin (requires admin key).
- **User Login**: Secure login with JSON Web Token (JWT) for authentication.
- **Train Search**: Search for trains based on source and destination.
- **Seat Availability**: View seat availability for trains.
- **Book Seats**: Book seats in real-time with race-condition handling.
- **View Bookings**: View booking details specific to the logged-in user.

### **Admin Features**
- **Add Trains**: Add new trains to the system with details like source, destination, and total seats.
- **Update Train Details**: Modify train details, including seat availability.
- **API Key Protection**: All admin functionalities are secured with an API key.

---

## **Tech Stack**
### **Frontend**
- React.js with Vite
- Tailwind CSS for styling

### **Backend**
- Node.js with Express.js
- Prisma ORM for database operations
- JWT for authentication
- bcrypt.js for password hashing

### **Database**
- PostgreSQL

---

## **Project Structure**
The project follows a well-structured MVC (Model-View-Controller) architecture:

---

### Description

1. **Backend**
   - **controllers/**: Contains the business logic for different entities such as users, trains, bookings, and authentication.
   - **routes/**: Handles API endpoints corresponding to different entities.
   - **middlewares/**: Contains middleware functions for the backend, such as authentication.
   - **prisma/**: Houses the Prisma schema for database modeling.
   - **app.js**: Entry point of the backend server.

2. **Frontend**
   - **components/**: Includes all reusable React components for the UI.
   - **api/**: Contains API-related logic for connecting frontend with backend.
   - **App.jsx**: Main file that initializes the frontend application.

---
# IRCTC Project Setup

This document provides step-by-step instructions to set up the backend and frontend for the IRCTC project.

---

## Backend Setup

1. **Clone the repository:**
```console
git clone https://github.com/akshathere/IRCTC.git
```
2. **Navigate to the backend directory. ** 
```console
cd IRCTC/backend
```
4. Install dependencies.  
```console
npm install
```  
5. Create a .env file in the backend directory and add the following environment variables:

```console
DATABASE_URL=your_postgresql_database_url
SECRET_KEY=your_jwt_secret_key
ADMIN_PRIVATE_KEY=your_admin_key
```
5. Run Prisma migrations:
```console
npx prisma migrate dev
```
7. Start the backend server:
```console
node src/server.js
```
**This will start the Express.js server on http://localhost:5000.**
## Frontend Setup
1. Navigate to the frontend directory:
```console
cd ../frontend
```
3. Install frontend dependencies:
```console
npm install
```
5. Start the development server:
```console
npm run dev
```
    


https://github.com/user-attachments/assets/bea5ca36-6534-4af3-8cc3-e62445446082





