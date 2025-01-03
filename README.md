# Real-Time Chat App with WebSockets  

## 🌟 Motivation to Learn WebSockets  
Have you ever wondered how instant messaging apps like WhatsApp, Slack, or Discord allow you to send and receive messages in real time? But do you think what technology makes your messages to appear instantly on your friend’s screen? The answer lies in **WebSockets**.  

WebSockets allow real-time, two-way communication between your browser and the server. This project was my way of diving into the world of WebSockets, learning how they work, and building a project to implement what I've learned.  

---

## 📚 What Are WebSockets?  
WebSocket is a **bidirectional** and **full-duplex protocol** that facilitates real-time communication between a client (browser) and a server.  
- **Bidirectional**: Data flows both ways (client ⇄ server).  
- **Full-Duplex**: Both client and server can send and receive messages simultaneously.  
- **Protocol**: A defined set of rules that devices follow to communicate.

WebSockets are perfect for scenarios where real-time updates are crucial, such as messaging, gaming, live score updates, or collaborative tools.  

---

## 🧐 Why Use WebSockets?  
WebSockets are efficient compared to traditional HTTP requests. Instead of sending a request to fetch new data, WebSockets keep a connection open, allowing data to flow instantly whenever there's an update. 
So, you won't have to refresh the page if you wanna see the updated data. 

---

## 🛠️ Examples of Apps Using WebSockets  
- Chat applications (WhatsApp, Slack, Discord).  
- Real-time gaming (multiplayer games).  
- Collaborative tools (Google Docs).  
- Live notifications or updates (stock market apps).  

---

## ✨ Features  
1. Broadcasting messaeges b/w all connected users.  
2. All users receive messages instantly.  
3. Storage of chat messages in MongoDB.  
5. Chat rooms for group-specific communication.  

---

## 🧰 Tech Stack  
**Backend**:  
- Node.js  
- Express.js  
- Socket.IO  
- MongoDB  

**Frontend**:  
- React.js  
- Socket.IO (Client)  

---

## 🔄 The Process  

### Backend  
1. **Creating the Server**:  
   - Used Express to set up a Node.js server.  

2. **Integrating Socket.IO**:  
   - Initialized Socket.IO on the server.  
   - Handled connection and disconnection events using `io.on`.  

3. **Database Integration**:  
   - Connected to MongoDB.  
   - Created a `Chat` model to store messages.  

4. **Handling Messages**:  
   - Saved new messages to the database whenever the `newMessage` event was fired.  
   - Retrieved all messages using the `getAllMessages` method to display them on the UI.  

---

### Frontend  
1. **Connecting to the Backend**:  
   - Integrated `socket.io-client` to connect to the WebSocket server.  

2. **Real-Time Messaging**:  
   - Used `socket.on` to listen for `newMessage` events and update the UI instantly.  
   - Allowed users to send new messages, which were broadcasted to all connected clients.  

---

## 🧠 What Did I Learn?  
1. **WebSocket Concepts**:  
   - Bidirectional communication, broadcasting messages and room-based messaging.  

2. **Socket.IO Methods**:  
   - `socket.emit`: To send events.  
   - `socket.on`: To listen for events.  
   - `socket.broadcast.emit`: To send messages to all clients except the sender.  
   - `io.emit`: To send messages to all connected clients.  
   - `io.to.emit`: To send messages to clients in a specific room.  

3. **Persistent Connections**:  
   - Learned about the   

4. **No Need to check for updates**
   - The best part was using the useEffect hook only when the component mounts, and there was no need to update states based on the backend requests.
---

## What more can be done ? 
Well, that was just the basics of web sockets, but there's so much more which you can learn. So, try to explore on your own and make as many projects you can. 

## 🔧 How to Run the App  

### Prerequisites  
- Node.js installed on your system.  
- MongoDB installed or a MongoDB Atlas cluster set up.  

### Steps  
1. Clone this repository:  
   ```bash
   git clone https://github.com/rumaisanaveed/chat-app.git
   cd chat-app
   ```  
2. Install dependencies for both backend and frontend:  
   ```bash
   cd backend
   npm install  
   cd ../frontend  
   npm install  
   ```  
3. Start the MongoDB server locally or connect to your MongoDB Atlas cluster.  

4. Start the backend server:  
   ```bash
   cd backend  
   npm start  
   ```  
5. Start the frontend:  
   ```bash
   cd frontend  
   npm start  
   ```  
6. Open the app in your browser at `http://localhost:3000`.  

---

## 🎥 Demo Video  
Watch the live demo to see how the application works :) 

https://github.com/user-attachments/assets/516e24fc-980a-4485-a881-0858be79e556

---  

## Resources 
Socket.io documentation to help understand the basics of sockets. 
Some articles also helped me learning this topic. 

--- 

**Feel free to fork this project, experiment, and create your own chat app! Happy Coding :)**
