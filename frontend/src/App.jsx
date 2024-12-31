import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");

  // Use a ref to persist the socket instance across renders
  const socketRef = useRef();

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = socketIOClient("http://localhost:3000");

    // Listen for incoming messages
    socketRef.current.on("message", (msg) => {
      setMessages((prevState) => [...prevState, msg]);
    });

    // start the interval

    let count = 0;
    const pingInterval = setInterval(() => {
      // ping every 10 seconds to check the connection
      // socketRef.current.volatile.emit("ping", ++count)
      socketRef.current.emit("ping", ++count);
    }, 1000);

    // Cleanup on component unmount
    return () => {
      clearInterval(pingInterval);
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // handle key press
    const handleKeyPress = (e) => {
      if (e.target.matches("input")) return;

      if (e.key === "c") socketRef.current.connect();
      if (e.key === "d") socketRef.current.disconnect();
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleAddMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socketRef.current.emit("newMessage", room, { text: message });
      setMessage("");
    }
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (room.trim()) {
      socketRef.current.emit("join-room", room);
    }
  };

  return (
    <div className="chat-container">
      <form>
        <label>Message:</label>
        <input
          type="text"
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit" onClick={handleAddMessage}>
          Send
        </button>

        <label>Room:</label>
        <input
          type="text"
          placeholder="Enter room name..."
          onChange={(e) => setRoom(e.target.value)}
          value={room}
        />
        <button type="submit" onClick={handleJoinRoom}>
          Join Room
        </button>
      </form>

      <div className="chat-list">
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
