const User = require("../models/User.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); 

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getAllUsers,
};
