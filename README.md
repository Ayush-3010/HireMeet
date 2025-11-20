# 🚀 HireMeet

**HireMeet** is a smart hiring & interview management platform designed to simplify the recruitment workflow.  
From scheduling meetings to hosting interview sessions with real-time features, HireMeet helps recruiters and candidates connect seamlessly.

---

## ✨ Features

👥 **User Authentication** – Secure login system using Clerk.  
🎯 **Create & Manage Interview Sessions** – Schedule and organize interviews with ease.  
📅 **Session Dashboard** – View upcoming and past interview sessions.  
💬 **Real-time Communication** – Integrated chat using Stream.  
🎥 **Video/Meet Integration** – Launch virtual meetings inside the platform.  
🛡️ **Protected Routes** – Secure endpoints for authenticated users.  
📂 **Backend API** – Node.js/Express-based REST API with database integration.  
🌐 **Deployed Web App** – Live production build accessible online.  

---

## 🛠️ Tech Stack

### **Frontend**
- React 19  
- Vite  
- React Router v7  
- Clerk (Authentication)  
- Tailwind CSS  
- Lucide React (Icons)  
- React Hot Toast  
- Axios

### **Backend**
- Node.js  
- Express  
- MongoDB / Mongoose  
- Inngest  
- Clerk Auth Middleware  
- Stream Chat  
- CORS, JWT, REST API routes  

---

## 🚀 Live Demo

👉 **Production URL:** https://hiremeet-hrbnx.sevalla.app

---

## 🧩 Getting Started

### **Clone the Repository**
```bash
git clone https://github.com/Ayush-3010/HireMeet.git
cd HireMeet
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

👉 App runs at: **http://localhost:5173**

---

## 🔑 Environment Variables

### **Frontend (.env.local)**  
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000
```

### **Backend (.env)**  
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
STREAM_API_KEY=your_stream_key
STREAM_SECRET=your_stream_secret
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
```

---

## 📂 Project Structure

```
HireMeet/
│── backend/
│── frontend/
│── README.md
│── .gitignore
```

---

## 🚀 Deployment

Deploy using:
- Sevalla

Build:
```bash
npm run build
npm run start
```

---

## 🤝 Contributing

Contributions are welcome! Open issues or PRs anytime.

---

## 📜 License

MIT License
