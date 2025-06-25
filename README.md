# Real-Time Chat App

Welcome to the **Real-Time Chat App**!

This project is a modern, full-stack chat platform built with Node.js, Express, Socket.IO, and React. It features real-time messaging, live user presence, typing indicators, and auto-clearing of chat history every 5 minutes. The app is fully responsive and works great on both desktop and mobile.

---
## 🌐 Website Live Link 

https://realtimechat13.netlify.app/

## ⚠ Important Note About Live Demo (Netlify + Render Free Tier)

The live demo link above is hosted on *Netlify* (frontend), while the backend server is hosted on *Render (free tier)*.

Because the backend is on Render's free plan, the server may go to sleep after about 15 minutes of inactivity.

*Please keep in mind:*
- If you open the site after it’s been idle, the backend may take up to 2 minutes to wake up.
- After logging in, if online users or chat messages are not showing, *please wait for around 2 minutes and then refresh the page*.
- Once the server is awake, everything (online users, messaging, typing indicator, etc.) will work smoothly and instantly.

This is a limitation of free hosting and not an issue with the app itself.  
For production or company use, a paid backend plan or always-on server is recommended.

*Thank you for your patience and understanding!*

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
## 📸 Screenshots
### Login Page
![Login Page](https://github.com/shivang1311/RealTimeChatApp/blob/6755ba6b2b9210859b457de549d32270461b6df9/Screenshot%202025-06-25%20093857.png)
### Chat Room
![Chat Room](https://github.com/shivang1311/RealTimeChatApp/blob/9303da38c0c1de7cc6b05ca91c4876fe9f639fab/Screenshot%202025-06-25%20094043.png)

## 📁 Project Structure
```bash
real-time-chat-app
│
├── backend/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── package.json
│   └── src/
│       └── App.js
│
├── README.md
└── ARCHITECTURE.md
```
## ⚙️ Architecture Overview

- **Backend:** Node.js + Express + Socket.IO. Handles real-time communication, user presence, message broadcasting, and auto-clearing of chat history.
- **Frontend:** React with Socket.IO-client. Provides a modern, responsive UI and manages real-time updates.
- **Communication:** All events (login, message, typing, online status) are handled via WebSockets for instant updates.
- **Auto-Clear:** Every 5 minutes, the backend wipes the chat history and notifies all clients.
---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/shivang1311/RealTimeChatApp.git
cd RealTimeChatApp
```
### 2. Backend Setup
```bash
cd backend
npm install
```
To run the backend locally:
```bash
node server.js
```
Backend runs at `http://localhost:5000` by default.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
To run the frontend locally:
```bash
npm start
```
Frontend runs at `http://localhost:3000` by default.

---


## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

This project is open-source and free to use for learning and personal projects.

---

**Enjoy chatting! If you have questions or want to suggest features, feel free to open an issue or pull request**
