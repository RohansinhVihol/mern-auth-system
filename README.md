# 🔐 Full Authentication System (JWT + OTP)

A complete **authentication & authorization system** built with **JWT**, **Email OTP verification**, and **secure password reset flow**. This project covers real-world auth features used in production apps.

---
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)

Production-ready MERN authentication system with secure email OTP workflow 🚀

## 🌐 Live Demo

🚀 **Frontend:**  
👉 https://mern-auth-client-mu.vercel.app

⚙️ **Backend API:**  
👉 https://mern-auth-server-mu.vercel.app

---

## 🚀 Features

✅ User Signup (Register)

✅ User Login (JWT-based authentication)

✅ Logout (HTTP-only cookies)

✅ Email Verification using OTP

✅ Resend Email Verification OTP

✅ Forgot Password (OTP on Email)

✅ Reset Password with OTP

✅ Protected Routes

✅ Rate Limiting (OTP abuse protection)

---

## 🛠 Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Context API
* Tailwind CSS
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (JSON Web Token)
* Nodemailer (Email OTP)
* bcrypt (Password Hashing)
* Cookie-parser

---

## 🔑 Authentication Flow

### 1️⃣ Signup

* User registers with **name, email, password**
* Password is hashed using bcrypt
* Account created but **not verified**

### 2️⃣ Email Verification (OTP)

* OTP sent to user's email
* User enters OTP
* Account marked as **verified**

### 3️⃣ Login

* Only verified users can login
* JWT token stored in **HTTP-only cookie**

### 4️⃣ Forgot Password

* User enters registered email
* OTP sent to email

### 5️⃣ Reset Password

* User verifies OTP
* Enters new password
* Password updated securely

---

## 📁 Project Structure

```
root
│
├── client (Frontend)
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── assets
│   │   └── App.jsx
│
├── server (Backend)
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middlewares
│   ├── utils
│   └── server.js
│
└── README.md
```

---

## 🔐 API Endpoints

### Auth Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |
| POST   | /api/auth/logout   | Logout user   |
| GET    | /api/auth/is-auth  | Check auth    |

### Email Verification

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| POST   | /api/auth/send-verify-otp | Send verification OTP  |
| POST   | /api/auth/verify-email    | Verify email using OTP |

### Password Reset

| Method | Endpoint                 | Description    |
| ------ | ------------------------ | -------------- |
| POST   | /api/auth/send-reset-otp | Send reset OTP |
| POST   | /api/auth/reset-password | Reset password |

---

## ⚙️ Environment Variables

```
PORT = *
MONGODB_URI = *
JWT_TOKEN_SECRET = *
ALLOWED_ORIGIN = *
JWT_TOKEN_EXPIRY = *
CORS_ORIGIN = *
SMTP_USER= *
SMTP_PASS=*
SENDER_EMAIL=*
```

---

## 🧪 Security Measures

* Passwords hashed using **bcrypt**
* JWT stored in **HTTP-only cookies**
* OTP expiry time implemented
* Rate limiting for OTP APIs
* Protected routes middleware

---

## ▶️ Run Locally

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📊 Project Status

✅ Completed  
✅ Production-ready authentication system  
✅ Ready for portfolio showcase

---

## 🏗 Architecture Highlights

* Secure JWT authentication using HTTP-only cookies
* Email OTP verification system
* Password reset with OTP validation
* Rate limiting protection against OTP abuse
* Modular MVC backend structure

---

## 📌 Future Improvements

* Refresh Token implementation
* OAuth (Google / GitHub login)
* Account lock after multiple failed OTP attempts
* Admin dashboard

---

## 👨‍💻 Author

**Rohansinh Vihol**

Full-Stack Developer  
BCA Student | Future Software Engineer 🚀

🔗 GitHub: https://github.com/RohansinhVihol  
🔗 LinkedIn: www.linkedin.com/in/rohansinhvihol

⭐ If you like this project, give it a star!
