require("dotenv").config();

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/auth.routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
connectDB();

/* CORS */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

/* Body Parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/api/chatbot", require("./routes/chatBot.routes"));
app.use("/api/users", require("./routes/user.routes"));

/* Start Server */
app.listen(PORT, () => {
  console.log("SERVER STARTED ON PORT " + PORT);
});
