const ChatBot = require("../models/ChatBot.model");
const OpenAI = require("openai");

// Initialize Groq client
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// 🔹 Send message & store chat
exports.sendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message required",
      });
    }

    // Find existing chat or create new
    let chat = await ChatBot.findOne({ user: userId });

    if (!chat) {
      chat = await ChatBot.create({
        user: userId,
        messages: [],
      });
    }

    // Save user message
    chat.messages.push({
      role: "user",
      content: message,
    });

    // Build conversation context (last 50 messages for memory)
    const conversation = [
      {
        role: "system",
        content:
          "You are Meta AI inside a WhatsApp clone built using the MERN stack. Be helpful, friendly, and concise.",
      },
      ...chat.messages.slice(-50).map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // 🔥 Call Groq
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: conversation,
      temperature: 0.7,
      max_tokens: 800,
    });

    const aiReply = completion.choices[0].message.content;

    // Save AI response
    chat.messages.push({
      role: "assistant",
      content: aiReply,
    });

    await chat.save();

    res.json({
      success: true,
      reply: aiReply,
      messages: chat.messages,
    });
  } catch (error) {
    console.error("ChatBot Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// 🔹 Get chat history
exports.getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const chat = await ChatBot.findOne({ user: userId });

    if (!chat) {
      return res.json({
        success: true,
        messages: [],
      });
    }

    res.json({
      success: true,
      messages: chat.messages,
    });
  } catch (error) {
    console.error("History Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// 🔹 Delete / Clear Chat History
exports.deleteChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const chat = await ChatBot.findOne({ user: userId });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "No chat history found",
      });
    }

    // Clear messages array
    chat.messages = [];
    await chat.save();

    res.json({
      success: true,
      message: "Chat history cleared successfully",
    });
  } catch (error) {
    console.error("Delete Chat Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
