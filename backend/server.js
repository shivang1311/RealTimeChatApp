const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

let chatHistory = [];
let onlineUsers = {};

io.on('connection', (socket) => {
  socket.on('login', (username) => {
    socket.username = username;
    onlineUsers[username] = socket.id;
    io.emit('onlineUsers', Object.keys(onlineUsers));
    socket.emit('chatHistory', chatHistory);
  });

  socket.on('sendMessage', (msg) => {
    chatHistory.push(msg);
    io.emit('receiveMessage', msg);
  });

  socket.on('typing', (username) => {
    io.emit('typing', username);
  });
  socket.on('stop_typing', (username) => {
    io.emit('stop_typing', username);
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      delete onlineUsers[socket.username];
      io.emit('onlineUsers', Object.keys(onlineUsers));
    }
  });
});

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

setInterval(() => {
  chatHistory = [];
  io.emit('chatHistory', chatHistory);
  console.log('Chat history cleared automatically every 5 minutes');
}, 300000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
