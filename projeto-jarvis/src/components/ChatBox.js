import React, { useEffect, useRef, useState } from 'react';
import './ChatBox.css';

const ChatBox = ({ messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const [storedMessages, setStoredMessages] = useState([]);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('jarvisMessages')) || [];
    setStoredMessages(savedMessages);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const updatedMessages = [...storedMessages, ...messages.slice(storedMessages.length)];
      setStoredMessages(updatedMessages);
      localStorage.setItem('jarvisMessages', JSON.stringify(updatedMessages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [storedMessages]);

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-messages">
        {storedMessages.map((msg, index) => (
          <div key={index} className={`message ${msg.from === 'user' ? 'user' : 'jarvis'}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBox;
