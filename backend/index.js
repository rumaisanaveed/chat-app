const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const connectDb = require("./db");
const Chat = require("./models/Chat");

// Initialize the app
const app = express();

// for parsing the requests
app.use(express());

// db connection
connectDb();

// create the server instance
const server = createServer(app);

// create an io instance to use socket.io in the app
const io = new Server(server, {
  // so that we can send requests from any browser
  cors: {
    origin: "*",
  },
});

// an event which will occur when a user is connected to the web socket server
io.on("connection", (socket) => {
  console.log("Connected");

  const getAllMessages = async () => {
    try {
      // getting messages in the order (newest messages first)
      const messages = await Chat.find().sort({ timeStamp: 1 }).exec();
      // sending these messages to the specific client
      socket.emit("chat", messages);
    } catch (error) {
      console.error(error);
    }
  };

  getAllMessages();

  // add a new message to the db
  socket.on("newMessage", async (message) => {
    try {
      const newMessage = new Chat(message);
      await newMessage.save();
      io.emit("message", message); // Emit to all clients
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // this event will happen when the user will be disconnected from the web socket server
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

// starting the server
server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
