const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  createOrGetChat,
  sendMessage,
  getMessages,
} = require("../controllers/chat.controller");

// Create or get chat
router.post("/create", protect, createOrGetChat);

// Send message
router.post("/send", protect, sendMessage);

// Get messages
router.get("/:chatId", protect, getMessages);

module.exports = router;
