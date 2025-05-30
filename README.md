# 🏪 Store Rating App

A full-stack web application where users can rate stores, and admins/store owners can manage store data. Built with **React**, **Node.js**, **Express**, and **PostgreSQL**.

---

## 🚀 Features

- 🔐 Secure authentication using JWT
- 👥 Role-based access:
  - Users can view and rate stores
  - Admins can create and manage stores
  - Store Owners can edit their store info
- ⭐ Rating system with average rating display
- 📊 Dashboards for each role
- 🎨 Clean, responsive UI built with Tailwind CSS

---

## 🖥️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Express, Node.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)

---

## 📁 Project Structure

StoreRating/
├── backend/ # Express API, PostgreSQL queries
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── config/
├── frontend/ # React app with pages/components
│ ├── pages/
│ ├── components/
│ ├── services/
│ └── utils/
└── README.md




## 🔧 Setup Instructions

### ⚙️ Backend

```bash
cd backend
npm install


Create .env file:
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/StoreRating
JWT_SECRET=your_secret_key
Run backend server:
npm run dev



🌐 Frontend
cd frontend
npm install
npm start

🧪 Environment Variables
In /backend/.env:
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/StoreRating
JWT_SECRET=your_secret_key

