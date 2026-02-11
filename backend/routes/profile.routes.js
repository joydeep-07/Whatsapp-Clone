const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  updateProfile,
  uploadProfileImage,
} = require("../controllers/profile.controller");

const protect = require("../middlewares/authMiddleware"); // your JWT middleware

// 📁 Multer Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Routes
router.put("/update", protect, updateProfile);
router.put(
  "/upload-image",
  protect,
  upload.single("profile"),
  uploadProfileImage,
);

module.exports = router;
