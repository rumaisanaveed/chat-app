const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const connectDb = require("./db");
const Chat = require("./models/Chat");

// Initialize the app
const app = express();

// for parsing the requests
app.use(express.json());

// db connection
connectDb();

// create the server instance
const server = createServer(app);

// create an io instance to use socket.io in the app
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// an event which will occur when a user is connected to the web socket server
io.on("connection", (socket) => {
  console.log(`Connected with the id ${socket.id}`);

  // Handle joining a room
  socket.on("join-room", (room) => {
    if (room) {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    }
  });

  // Handle sending a new message
  socket.on("newMessage", async (room, message) => {
    try {
      const newMessage = new Chat(message);
      await newMessage.save();

      if (room) {
        // Send the message to users in the specific room
        io.to(room).emit("message", message);
        console.log(`Message sent to room ${room}: ${message.text}`);
      } else {
        // Broadcast the message to all users
        io.emit("message", message);
        console.log(`Broadcast message: ${message.text}`);
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("ping", (n) => {
    console.log(n);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Disconnected socket id ${socket.id}`);
  });
});

// starting the server
server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
