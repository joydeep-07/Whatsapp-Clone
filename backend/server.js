require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   CONNECT DATABASE
========================= */
connectDB();

/* =========================
   MIDDLEWARES
========================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES
========================= */
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/api/chatbot", require("./routes/chatBot.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/chat", require("./routes/chat.routes"));

app.use("/uploads", express.static("uploads"));

/* =========================
   SOCKET.IO SETUP
========================= */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Store online users
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🔵 User connected:", socket.id);

  /*
    When user logs in,
    frontend should emit: socket.emit("join", userId)
  */
  socket.on("join", (userId) => {
    socket.join(userId);

    onlineUsers.set(userId, socket.id);

    // Broadcast to others user is online
    io.emit("userOnline", userId);

    console.log("✅ User joined room:", userId);
  });

  /*
    Realtime message sending
    socket.emit("sendMessage", {
      senderId,
      receiverId,
      text
    })
  */
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const messageData = {
      sender: senderId,
      text,
      createdAt: new Date(),
    };

    // Send message to receiver room
    io.to(receiverId).emit("receiveMessage", messageData);

    // Optional: send back to sender (for confirmation sync)
    io.to(senderId).emit("messageSent", messageData);
  });

  /*
    Typing Indicator
  */
  socket.on("typing", ({ senderId, receiverId }) => {
    io.to(receiverId).emit("typing", senderId);
  });

  socket.on("stopTyping", ({ senderId, receiverId }) => {
    io.to(receiverId).emit("stopTyping", senderId);
  });

  /*
    On disconnect
  */
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);

    // Remove from online users
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);

        // Notify others user went offline
        io.emit("userOffline", userId);

        break;
      }
    }
  });
});

/* =========================
   START SERVER
========================= */
server.listen(PORT, () => {
  console.log("🚀 SERVER STARTED ON PORT " + PORT);
});
