const Chat = require("../models/Chat.model");

/*
🔹 Create or Get Chat Between Two Users
*/
exports.createOrGetChat = async (req, res) => {
  try {
    const { userId } = req.body; // receiver id
    const currentUserId = req.user._id;

    // Check if chat already exists
    let chat = await Chat.findOne({
      participants: { $all: [currentUserId, userId] },
    }).populate("participants", "-password");

    if (!chat) {
      chat = await Chat.create({
        participants: [currentUserId, userId],
        messages: [],
      });
    }

    res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/*
🔹 Send Message
*/
exports.sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const senderId = req.user._id;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const newMessage = {
      sender: senderId,
      text,
      readBy: [senderId],
    };

    chat.messages.push(newMessage);
    chat.lastMessage = text;

    await chat.save();

    res.status(200).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/*
🔹 Get Messages
*/
exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId)
      .populate("messages.sender", "name profilePic")
      .populate("participants", "name profilePic");

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.status(200).json({
      success: true,
      messages: chat.messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
