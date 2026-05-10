# 🚀 SyncSpace — Collaborative Workspace Platform

SyncSpace is a modern full-stack workspace and task management platform designed for seamless team collaboration, project organization, and productivity tracking.

Built using **React + FastAPI + SQLite** with a responsive futuristic SaaS-style interface.

---

# ✨ Features

| Feature | Details |
|---|---|
| 🔐 Authentication | Secure JWT-based login & signup |
| 👥 Team Collaboration | Add members and manage workspace access |
| 📁 Workspace Projects | Create, organize, and manage projects |
| ✅ Task Management | Assign tasks, priorities, due dates & statuses |
| 📊 Productivity Dashboard | Real-time workspace statistics & progress tracking |
| ⚡ Kanban Workflow | Organize tasks visually across multiple stages |
| 🛡️ Role-Based Access | Admin and Member permission system |
| 📱 Fully Responsive | Optimized for desktop, tablet, and mobile |
| 🎨 Modern UI | Glassmorphism + gradient SaaS-inspired interface |

---

# 🏗️ Tech Stack

## Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- date-fns
- React Hot Toast

## Backend
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- bcrypt Password Hashing

---

# 📁 Project Structure

```bash
syncspace-workspace/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── requirements.txt
│   │
│   ├── core/
│   │   ├── auth.py
│   │   └── config.py
│   │
│   └── routers/
│       ├── auth.py
│       ├── users.py
│       ├── projects.py
│       └── tasks.py
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskModal.jsx
│   │   │   └── ProjectModal.jsx
│   │   │
│   │   └── pages/
│   │       ├── Login.jsx
│   │       ├── Signup.jsx
│   │       ├── Dashboard.jsx
│   │       ├── Projects.jsx
│   │       ├── ProjectDetail.jsx
│   │       ├── Tasks.jsx
│   │       ├── Team.jsx
│   │       └── Profile.jsx
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

# ⚙️ Local Development Setup

## Prerequisites

- Python 3.11+
- Node.js 18+

---

# 1️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create env file
copy .env.example .env

# Start backend server
python -m uvicorn main:app --reload --port 8000
```

Backend API:

```bash
http://localhost:8000
```

API Documentation:

```bash
http://localhost:8000/docs
```

---

# 2️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start frontend server
npm run dev
```

Frontend Application:

```bash
http://localhost:5173
```

---

# 🔑 Core Functionalities

- User Authentication
- Workspace Management
- Team Member Management
- Project Collaboration
- Kanban Task Boards
- Task Prioritization
- Due Date Tracking
- Dashboard Analytics
- Admin Access Controls

---

# 🛡️ Access Control

| Permission | Member | Admin |
|---|---|---|
| View Assigned Tasks | ✅ | ✅ |
| Create Projects | ✅ | ✅ |
| Edit Own Projects | ✅ | ✅ |
| Manage Team Members | ❌ | ✅ |
| Change User Roles | ❌ | ✅ |
| Delete Any Project | ❌ | ✅ |

---

# 📱 Responsive Design

SyncSpace is optimized for:

- Desktop Screens
- Tablets
- Mobile Devices
- Touch Interfaces
- Modern Browsers

---

# 🎨 UI Highlights

- Glassmorphism Design
- Gradient Workspace Theme
- Smooth Animations
- Responsive Kanban Layout
- Adaptive Sidebar Navigation
- Modern SaaS Aesthetics

---

# 🚀 Future Improvements

- Real-time collaboration
- WebSocket notifications
- Drag-and-drop kanban
- File attachments
- Dark/light themes
- PostgreSQL support
- Cloud deployment

---

# 👨‍💻 Developer

Developed by **Rishav Singh**

GitHub:
https://github.com/rishavv30

---

# 📄 License

This project is developed for educational and assessment purposes.
