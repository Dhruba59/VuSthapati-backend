import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import projectRoutes from "./routes/projects.js"
import contactRoutes from "./routes/contact.js"
import authRoutes from "./routes/auth.js"
import skillRoutes from "./routes/skills.js"
import newsRoutes from "./routes/news.js"
import messageRoutes from "./routes/message.js"
import fs from "fs"
import multer from 'multer';
import axios from "axios"
import FormData from 'form-data';

const upload = multer({ dest: 'uploads/' }); // or configure storage as needed

// Load environment variables
dotenv.config()

// Create Express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/projects", projectRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/news", newsRoutes)
app.use("/api/skills", skillRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/upload-image", express.static("uploads")) // Serve static files from the uploads directory



// Root route
app.get("/", (req, res) => {
  res.send("Portfolio API is running")
})

app.post('/api/upload-images', async (req, res) => {

  const { imagesBase64 } = req.body;
  const uploadPromises = imagesBase64.map( async (base64Image) => {
    const formData = new FormData();
    formData.append('image', base64Image.split(',')[1]); // Remove "data:image/...;base64,"
    return await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, formData);
  });

  const responses = await Promise.all(uploadPromises);
  const imageUrls = responses.map((res) => res.data.data.url);

  return res.status(200).json({ urls: imageUrls });

});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

