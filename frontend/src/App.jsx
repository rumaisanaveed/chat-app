import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

function App() {
  // connecting our socket to the backend
  const socketio = socketIOClient("http://localhost:3000");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // receive all the messages
    socketio.on("chat", (messages) => {
      setMessages(messages);
    });

    // whenever a message is sent to the server we wanna update our UI
    socketio.on("message", (msg) => {
      // adding the new message to the array
      setMessages((prevState) => [...prevState, msg]);
    });
    // cleanup function to avoid duplicate listeners
    return () => {
      socketio.off("message");
      socketio.on("chat");
    };
  }, []);

  const handleAddMessage = (e) => {
    e.preventDefault();
    // sending the message to the server
    socketio.emit("newMessage", {
      text: message,
    });
    setMessage("");
  };

  return (
    <div className="chat-container">
      <form onSubmit={handleAddMessage}>
        <label>Message : </label>
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit">Send</button>
      </form>
      <div className="chat-list">
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
