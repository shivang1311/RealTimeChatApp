# Real-Time Chat App

Welcome to the **Real-Time Chat App**!

This project is a modern, full-stack chat platform built with Node.js, Express, Socket.IO, and React. It features real-time messaging, live user presence, typing indicators, and auto-clearing of chat history every 5 minutes. The app is fully responsive and works great on both desktop and mobile.

---

## 🚀 Features

- **Live User Login:** Simple username login (no password needed)
- **Real-Time Messaging:** Instant messages for all connected users
- **Chat History:** Synced chat history for everyone, auto-cleared every 5 minutes
- **Typing Indicators:** See when you or someone else is typing (animated)
- **Online Users Display:** Avatars and full usernames of all online users
- **Responsive Design:** Works on desktop and mobile browsers
- **Modern UI:** Distinct message bubbles, avatars, and a clean interface

---

real-time-chat-app/
- │
- ├── backend/
- │   ├── package.json
- │   └── server.js
- │
- ├── frontend/
- │   ├── package.json
- │   └── src/
- │       └── App.js
- │
- ├── README.md
- └── ARCHITECTURE.md


---

## 🛠️ Getting Started

### 1. Clone the Repository

git clone https://github.com/yourusername/real-time-chat-app.git
cd real-time-chat-app

### 2. Backend Setup

cd backend
npm install


To run the backend locally:

node server.js

Backend runs at `http://localhost:5000` by default.

### 3. Frontend Setup

cd ../frontend
npm install


To run the frontend locally:


npm start

Frontend runs at `http://localhost:3000` by default.



## ⚙️ Architecture Overview

- **Backend:** Node.js + Express + Socket.IO. Handles real-time communication, user presence, message broadcasting, and auto-clearing of chat history.
- **Frontend:** React with Socket.IO-client. Provides a modern, responsive UI and manages real-time updates.
- **Communication:** All events (login, message, typing, online status) are handled via WebSockets for instant updates.
- **Auto-Clear:** Every 5 minutes, the backend wipes the chat history and notifies all clients.


## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

This project is open-source and free to use for learning and personal projects.

---

**Enjoy chatting! If you have questions or want to suggest features, feel free to open an issue or contact the maintainer.**
