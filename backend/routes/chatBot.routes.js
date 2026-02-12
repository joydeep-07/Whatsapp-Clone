const express = require("express");
const router = express.Router();
const chatBotController = require("../controllers/chatBot.controller");
const authMiddleware = require("../middlewares/authMiddleware"); // your existing auth middleware

router.post("/send", authMiddleware, chatBotController.sendMessage);
router.get("/history", authMiddleware, chatBotController.getChatHistory);
router.delete("/delete", authMiddleware, chatBotController.deleteChatHistory);

module.exports = router;
