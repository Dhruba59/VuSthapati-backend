import express from "express"
import Project from "../models/Project.js"
import { authMiddleware } from "../middleware/auth.js"
import Message from "../models/Message.js"

const router = express.Router()

// Get all messages
router.get("/", async (req, res) => {
  try {
    const msg = await Message.find().sort({ order: 1, createdAt: -1 }).select("-__v")
    res.json(msg)
  } catch (error) {
    console.error("Error fetching Messages:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new message
router.post("/", async (req, res) => {
  try {
    const newMsg = new Message(req.body)
    const msg = await newMsg.save()

    res.status(201).json(msg)
  } catch (error) {
    console.error("Error creating message:", error)
    res.status(400).json({ message: error.message })
  }
})


// Delete project (protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id)

    if (!msg) {
      return res.status(404).json({ message: "Message not found" })
    }

    res.status(200).json({ message: "Message removed" })
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Message not found" })
    }

    res.status(500).json({ message: "Server error" })
  }
})

export default router

