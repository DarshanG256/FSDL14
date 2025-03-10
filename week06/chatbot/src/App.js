import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  // Function to generate dynamic bot responses
  const generateBotResponse = (userInput) => {
    if (userInput.toLowerCase().includes("hello")) {
      return "Hi there! How can I assist you?";
    } else if (userInput.toLowerCase().includes("how are you")) {
      return "I'm doing great, thanks for asking!";
    } else if (userInput.toLowerCase().includes("bye")) {
      return "Goodbye! Have a great day!";
    } else if (userInput.toLowerCase().includes("help")) {
      return "Sure! What do you need help with?";
    } else {
      return "I'm sorry, I don't quite understand that.";
    }
  };

  const handleMessageSend = () => {
    if (input.trim() === "") return;

    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user" },
    ]);

    // Generate bot response based on user input
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
    }, 1000);

    // Clear the input field
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user" : "bot"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
  );
};

export default App;
