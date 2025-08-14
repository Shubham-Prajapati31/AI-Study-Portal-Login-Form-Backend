import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors(
    {
        origin: process.env.CLIENT_URL || "http://localhost:3000", // Allow requests from the client URL
        credentials: true, // Allow cookies to be sent with requests
    }
));
app.use(express.json()); // For JSON request body parsing
app.use(express.urlencoded({ extended: true })); // For form data

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/users", userRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
