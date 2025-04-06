import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Check if MongoDB URI exists
if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is missing in .env file!");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");

    // Start Express server **only after successful DB connection**
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

    // Default route for testing
    app.get("/", (req, res) => {
      res.send("Expense Tracker API is running...");
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit the app if MongoDB connection fails
  });


  //Amritesh.