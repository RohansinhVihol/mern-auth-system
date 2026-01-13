# 🔐 Full Authentication System (JWT + OTP)

A complete **authentication & authorization system** built with **JWT**, **Email OTP verification**, and **secure password reset flow**. This project covers real-world auth features used in production apps.

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

Create a `.env` file in backend root:

```
PORT=*
MONGO_URI=*
JWT_SECRET=*
EMAIL_USER=*
EMAIL_PASS=*
CLIENT_URL=*
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

## 📌 Future Improvements

* Refresh Token implementation
* OAuth (Google / GitHub login)
* Account lock after multiple failed OTP attempts
* Admin dashboard

---

## 👨‍💻 Author

**Rohansinh Vihol**

BCA Student | Full Stack Developer

---

⭐ If you like this project, give it a star!
