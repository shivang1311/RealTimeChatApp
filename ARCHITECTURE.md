# 🏗️ Architecture Overview – Real-Time Chat App

The **Real-Time Chat App** is a full-stack application designed to provide instant communication between users. It uses **WebSocket technology** to enable real-time interaction and manages everything through a **clean separation of frontend and backend**.

---

## 🧠 Core Technologies

| Layer        | Technology Used                     |
|--------------|-------------------------------------|
| Frontend     | React, HTML, CSS, JavaScript, Socket.IO Client |
| Backend      | Node.js, Express, Socket.IO         |
| Communication| WebSockets (Socket.IO)              |
| Hosting (Dev)| Localhost (Default ports: 3000/5000)|

---

## ⚙️ System Architecture

```
             ┌───────────────────────────────┐
             │         Web Browser           │
             │     (React Frontend UI)       │
             └────────────▲──────────────────┘
                          │ Socket.IO Client
                          ▼
             ┌───────────────────────────────┐
             │      Node.js + Express        │
             │   (Backend Web Server API)    │
             └────────────▲──────────────────┘
                          │ Socket.IO Server
                          ▼
             ┌───────────────────────────────┐
             │         WebSocket Layer       │
             │    Real-Time Event Channel    │
             └───────────────────────────────┘
```

---

## 🔄 Data Flow and Communication

1. **Login Process**
   - User enters a unique username.
   - A `login` event is emitted via Socket.IO to the backend.
   - Backend stores user in memory and broadcasts updated online users list.

2. **Messaging**
   - User sends a message → `chat message` event is emitted.
   - Server receives it and broadcasts the message to all connected clients.

3. **Typing Indicator**
   - When a user types, a `typing` event is triggered.
   - Server emits this to others to show "User is typing..." feedback.

4. **Auto-Clearing Chat**
   - A `setInterval` in the server clears chat history every 5 minutes.
   - A `clear chat` event is sent to all clients to remove messages from the UI.

5. **User Disconnect**
   - On browser/tab close or refresh, `disconnect` is triggered.
   - Backend removes the user and updates the online list.

---

## 🗂️ Folder Breakdown

```bash
real-time-chat-app/
│
├── backend/
│   ├── server.js          # Main server logic, Socket.IO setup, chat logic
│   └── package.json       # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   └── App.js         # Frontend UI, Socket event handlers
│   └── package.json       # Frontend dependencies
│
├── README.md              # Project overview
└── ARCHITECTURE.md        # You are here
```

---

## ⏱️ Chat Clear Timer Logic

- Implemented with `setInterval` in `server.js`:
```js
setInterval(() => {
  messages = [];
  io.emit('clear chat');
}, 5 * 60 * 1000); // every 5 minutes
```

- Frontend listens for `clear chat` and clears its state accordingly.

---

## ✅ Event Summary

| Event Name      | Direction      | Description                                 |
|------------------|----------------|---------------------------------------------|
| `login`          | Client → Server | Sends username to log in                    |
| `user joined`    | Server → All   | Broadcasts new user                         |
| `chat message`   | Client → Server | Sends message                               |
| `chat message`   | Server → All   | Broadcasts message                          |
| `typing`         | Client → Server | Notifies server that user is typing         |
| `typing`         | Server → Others| Shows typing indicator                      |
| `clear chat`     | Server → All   | Clears message history after interval       |
| `disconnect`     | Built-in       | Handles user leaving                        |

---

## 📌 Design Principles

- **Stateless Clients**: The server maintains user state and chat history (temporary).
- **Real-Time Sync**: All users stay up-to-date with messages and status through WebSockets.
- **Scalable Foundation**: Ready for enhancements like authentication, database storage, private rooms, etc.
