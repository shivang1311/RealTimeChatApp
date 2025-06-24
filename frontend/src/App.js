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
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.on('chatHistory', (history) => setChat(history));
    socket.on('receiveMessage', (msg) => setChat((prev) => [...prev, msg]));
    socket.on('typing', (user) => setTypingUser(user));
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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typingUser]);

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

  let typingIndicator = '';
  if (typingUser) {
    typingIndicator = typingUser === username ? 'You are typing...' : `${typingUser} is typing...`;
  }

  const containerStyle = {
    maxWidth: 600,
    margin: '30px auto',
    padding: 20,
    borderRadius: 16,
    background: 'linear-gradient(135deg, #e3f0ff 0%, #fafbfc 100%)',
    boxShadow: '0 8px 32px rgba(25,118,210,0.07)',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    height: '85vh'
  };

  const chatBoxStyle = {
    flex: 1,
    overflowY: 'auto',
    marginBottom: 10,
    padding: '10px 0',
    border: 'none',
    borderRadius: 8,
    background: 'transparent'
  };

  const inputContainerStyle = {
    display: 'flex',
    marginTop: 10
  };

  const inputStyle = {
    flex: 1,
    padding: 14,
    fontSize: 16,
    borderRadius: '20px 0 0 20px',
    border: '1px solid #ccc',
    outline: 'none',
    marginRight: 2,
    transition: 'border 0.2s',
    background: '#f5f7fa'
  };

  const buttonStyle = {
    padding: '14px 28px',
    fontSize: 16,
    borderRadius: '0 20px 20px 0',
    border: 'none',
    backgroundColor: '#1976d2',
    color: 'white',
    cursor: message.trim() ? 'pointer' : 'not-allowed',
    transition: 'background-color 0.3s',
    fontWeight: 600,
    opacity: message.trim() ? 1 : 0.6
  };

  const onlineUsersStyle = {
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  };

  const avatarStyle = (user) => ({
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: user === username ? '#1976d2' : '#e0e0e0',
    color: user === username ? '#fff' : '#222',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    marginRight: 6,
    fontSize: 14,
    border: user === username ? '2px solid #1565c0' : '2px solid #bbb',
    boxShadow: user === username ? '0 2px 8px #1976d255' : 'none'
  });

  const typingStyle = {
    fontStyle: 'italic',
    color: '#888',
    margin: '8px 0 0 8px',
    display: 'flex',
    alignItems: 'center'
  };

  const typingDotStyle = {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#1976d2',
    margin: '0 4px 0 0',
    animation: 'blink 1s infinite alternate'
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes blink {
        0% { opacity: 0.2; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  if (!loggedIn) {
    return (
      <div style={{
        margin: '80px auto', width: 350, fontFamily: 'Segoe UI, Arial, sans-serif',
        background: 'linear-gradient(135deg, #e3f0ff 0%, #fafbfc 100%)',
        borderRadius: 18, boxShadow: '0 8px 32px rgba(25,118,210,0.13)', padding: 32
      }}>
        <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>Welcome to ChatApp 🚀</h2>
        <input
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            width: '100%', padding: 14, fontSize: 16, borderRadius: 12,
            border: '1px solid #ccc', marginBottom: 18, background: '#f5f7fa'
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: 14,
            fontSize: 16,
            borderRadius: 12,
            border: 'none',
            backgroundColor: '#1976d2',
            color: 'white',
            cursor: username.trim() ? 'pointer' : 'not-allowed',
            fontWeight: 600,
            opacity: username.trim() ? 1 : 0.6
          }}
          disabled={!username.trim()}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#1976d2', marginBottom: 10, textAlign: 'center', letterSpacing: 1 }}>💬 Chat Room</h2>
      <div style={onlineUsersStyle}>
        <b style={{ marginRight: 8, fontSize: 15, color: '#1976d2' }}>Online:</b>
        {onlineUsers.length > 0 ? (
          onlineUsers.map(user => (
            <div key={user} style={{ display: 'flex', alignItems: 'center', marginRight: 12 }}>
              <div title={user} style={avatarStyle(user)}>
                {user[0].toUpperCase()}
              </div>
              <span style={{
                fontWeight: user === username ? 700 : 500,
                color: user === username ? '#1976d2' : '#222',
                fontSize: 14,
                marginLeft: 4,
                marginRight: 2
              }}>
                {user}
              </span>
            </div>
          ))
        ) : (
          <span style={{ color: '#888' }}>No one online</span>
        )}
      </div>
      <div style={chatBoxStyle}>
        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.username === username ? 'flex-end' : 'flex-start',
              marginBottom: 8
            }}
          >
            <div
              style={{
                background: msg.username === username ? '#1976d2' : '#e0e0e0',
                color: msg.username === username ? '#fff' : '#222',
                padding: '10px 18px',
                borderRadius: 20,
                maxWidth: '70%',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                position: 'relative'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 2, opacity: 0.8 }}>
                {msg.username === username ? 'You' : msg.username}
              </div>
              <div style={{ fontSize: 15 }}>{msg.text}</div>
              <div style={{ fontSize: 10, textAlign: 'right', marginTop: 2, opacity: 0.7 }}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        {typingIndicator && (
          <div style={typingStyle}>
            <span style={typingDotStyle}></span>
            <span style={{ marginLeft: 6 }}>{typingIndicator}</span>
          </div>
        )}
        <div ref={chatEndRef}></div>
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