import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
const socket = io('https://realtimechatapp-puwy.onrender.com');
function App() {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typingUser, setTypingUser] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    socket.on('chatHistory', (history) => setChat(history));
    socket.on('receiveMessage', (msg) => setChat((prev) => [...prev, msg]));
    socket.on('typing', (user) => {
      setTypingUser(user);
    });
    socket.on('stop_typing', () => setTypingUser(''));
    socket.on('onlineUsers', setOnlineUsers);

    return () => {
      socket.off('chatHistory');
      socket.off('receiveMessage');
      socket.off('typing');
      socket.off('stop_typing');
      socket.off('onlineUsers');
    };
  }, []);

  const handleLogin = () => {
    if (username.trim()) {
      socket.emit('login', username);
      setLoggedIn(true);
    }
  };
  const handleSend = () => {
    if (message.trim()) {
      socket.emit('sendMessage', {
        username,
        text: message,
        time: new Date().toLocaleTimeString()
      });
      setMessage('');
      socket.emit('stop_typing', username);
    }
  };
  const handleTyping = () => {
    socket.emit('typing', username);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop_typing', username);
    }, 1500);
  };
  const containerStyle = {
    maxWidth: 600,
    margin: '30px auto',
    padding: 20,
    border: '1px solid #ddd',
    borderRadius: 10,
    background: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    height: '80vh'
  };
  const chatBoxStyle = {
    flex: 1,
    overflowY: 'auto',
    marginBottom: 10,
    padding: 15,
    border: '1px solid #ccc',
    borderRadius: 8,
    background: '#fff',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
  };
  const inputContainerStyle = {
    display: 'flex',
    marginTop: 10
  };
  const inputStyle = {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: '8px 0 0 8px',
    border: '1px solid #ccc',
    outline: 'none'
  };
  const buttonStyle = {
    padding: '10px 20px',
    fontSize: 16,
    borderRadius: '0 8px 8px 0',
    border: 'none',
    backgroundColor: '#1976d2',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };
  const onlineUsersStyle = {
    marginBottom: 10,
    fontSize: '0.9em',
    color: '#555'
  };
  const typingStyle = {
    fontStyle: 'italic',
    color: '#888',
    marginTop: 5
  };
  if (!loggedIn) {
    return (
      <div style={{ margin: '50px auto', width: 350, fontFamily: 'Arial, sans-serif' }}>
        <h2 style={{ textAlign: 'center', color: '#1976d2' }}>Welcome to ChatApp</h2>
        <input
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', padding: 12, fontSize: 16, borderRadius: 8, border: '1px solid #ccc', marginBottom: 15 }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: 12,
            fontSize: 16,
            borderRadius: 8,
            border: 'none',
            backgroundColor: '#1976d2',
            color: 'white',
            cursor: 'pointer'
          }}
          disabled={!username.trim()}
        >
          Login
        </button>
      </div>
    );
  }
  let typingIndicator = '';
  if (typingUser) {
    if (typingUser === username) {
      typingIndicator = 'You are typing...';
    } else {
      typingIndicator = `${typingUser} is typing...`;
    }
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#1976d2', marginBottom: 10, textAlign: 'center' }}>Chat Room</h2>
      <div style={onlineUsersStyle}>
        <b>Online Users:</b> {onlineUsers.length > 0 ? onlineUsers.join(', ') : 'No one online'}
      </div>
      <div style={chatBoxStyle}>
        {chat.map((msg, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <b style={{ color: msg.username === username ? '#1976d2' : '#333' }}>{msg.username}:</b>{' '}
            <span>{msg.text}</span>{' '}
            <span style={{ fontSize: '0.75em', color: '#888' }}>{msg.time}</span>
          </div>
        ))}
        {typingIndicator && (
          <div style={typingStyle}>{typingIndicator}</div>
        )}
      </div>
      <div style={inputContainerStyle}>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          placeholder="Type a message"
          style={inputStyle}
          onKeyPress={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <button
          onClick={handleSend}
          style={buttonStyle}
          disabled={!message.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
export default App;