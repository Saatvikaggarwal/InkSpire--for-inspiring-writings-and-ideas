# 🖋️ InkSpire — For Inspiring Writings and Ideas  

**Developer:** [Saatvik Aggarwal](https://github.com/Saatvikaggarwal)  
**Date:** October 2025  

InkSpire is a full-stack web application that empowers users to **write, share, and discover** inspiring ideas and stories. Built using **React, Node.js, Express, PostgreSQL, and Prisma**, it provides a secure and engaging space for writers and readers.

---

## 📚 Table of Contents
1. [Overview](#overview)  
2. [Tech Stack](#tech-stack)  
3. [Features](#features)  
4. [Project Structure](#project-structure)  
5. [Installation & Setup](#installation--setup)  
6. [Environment Variables](#environment-variables)  
7. [Database Design](#database-design)  
8. [API Endpoints](#api-endpoints)  
9. [Frontend Overview](#frontend-overview)  
10. [Deployment Guide](#deployment-guide)  
11. [Future Enhancements](#future-enhancements)  
12. [Author](#author)

---

## 🧠 Overview
InkSpire is a writing platform built to encourage creativity, reading, and engagement among users.  
Users can:
- Register and authenticate securely.  
- Write and publish posts.  
- View and comment on others’ writings.  
- Manage personal profiles and posts.

---

## ⚙️ Tech Stack

| Component | Technology | Description |
|------------|-------------|-------------|
| **Frontend** | React.js, Vite, Axios, CSS | Responsive user interface |
| **Backend** | Node.js, Express.js | RESTful API handling |
| **Database** | PostgreSQL | Persistent data storage |
| **ORM** | Prisma | Object-Relational Mapping |
| **Authentication** | JWT (JSON Web Tokens) | Secure session handling |
| **Hosting** | Render (Backend), Vercel (Frontend) | Cloud deployment |

---

## ✨ Features
- 🔐 Secure JWT Authentication  
- 📝 Create, Edit, and Read Posts  
- 💬 Comment on Posts  
- 👤 User Profiles  
- 📱 Responsive Design  
- ⚡ Deployed Full-Stack Integration  

---

## 📁 Project Structure
InkSpire/
│
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── generated/prisma/
│ ├── prisma/schema.prisma
│ ├── .env
│ └── index.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api/
│ │ └── App.jsx
│ └── vite.config.js
│
└── README.md

yaml
Copy code

---

## ⚡ Installation & Setup

### 🧩 Prerequisites
Make sure the following are installed:
- Node.js (v16+)
- PostgreSQL
- Git

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Saatvikaggarwal/InkSpire--for-inspiring-writings-and-ideas.git
cd InkSpire--for-inspiring-writings-and-ideas
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
npx prisma migrate dev
npx prisma generate
npm start
3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
🔑 Environment Variables
Backend .env
env
Copy code
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET="your-secret-key"
NODE_ENV=production
PORT=5000
Frontend .env
env
Copy code
VITE_API_BASE_URL=https://your-backend.onrender.com
🧩 Database Design (Prisma Models)
prisma
Copy code
model User {
  id        String   @id @default(uuid())
  username  String
  email     String   @unique
  password  String
  posts     Post[]
  comments  Comment[]
  createdAt DateTime @default(now())
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  comments  Comment[]
  createdAt DateTime @default(now())
}

model Comment {
  id        String   @id @default(uuid())
  content   String
  postId    String
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  post      Post     @relation(fields: [postId], references: [id])
  createdAt DateTime @default(now())
}
📡 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Authenticate user
GET	/api/auth/me	Get current logged-in user
POST	/api/auth/logout	Logout user

Posts
Method	Endpoint	Description
GET	/api/post	Fetch all posts
POST	/api/post	Create a new post
GET	/api/post/:id	Fetch single post by ID

Likes / Comments
Method	Endpoint	Description
POST	/api/like	Like or unlike a post
POST	/api/comment	Add comment to a post

💻 Frontend Overview
Framework: React + Vite

HTTP Client: Axios

Routing: React Router

State Management: React Hooks

Main Pages:
🏠 Home — Displays feed of posts

📝 Create Post — Write and publish ideas

👤 Profile — Manage your content

🔑 Login/Signup — Secure user access

🌍 Deployment Guide
Frontend (Vercel)
Connect your GitHub repo to Vercel.

Add environment variable:

env
Copy code
VITE_API_BASE_URL=https://your-backend.onrender.com
Deploy directly via Vercel dashboard.

Backend (Render)
Create a new Web Service in Render.

Add environment variables:

env
Copy code
DATABASE_URL=
JWT_SECRET=
NODE_ENV=production
Deploy and obtain the public URL (use it in frontend .env).

🔮 Future Enhancements
🔔 Real-time notifications for comments and likes

🔎 Search and filtering of posts

🌐 Social login (Google, Facebook)

💅 Enhanced UI animations and transitions

🧠 AI-based content recommendations

🧑‍💻 Author
Saatvik Aggarwal
📧 Email: saatvik@example.com
🔗 GitHub Profile
🌍 Project Repository: InkSpire

“InkSpire — where words ignite imagination.” ✨
