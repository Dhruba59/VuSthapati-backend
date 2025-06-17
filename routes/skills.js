import express from "express"
import Skill from "../models/Skill.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

// Get all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1, name: 1 }).select("-__v")

    res.json(skills)
  } catch (error) {
    console.error("Error fetching skills:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get skills by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params

    const skills = await Skill.find({ category }).sort({ order: 1, name: 1 }).select("-__v")

    res.json(skills)
  } catch (error) {
    console.error("Error fetching skills by category:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new skill (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newSkill = new Skill(req.body)
    const skill = await newSkill.save()

    res.status(201).json(skill)
  } catch (error) {
    console.error("Error creating skill:", error)

    if (error.code === 11000) {
      return res.status(400).json({ message: "Skill already exists" })
    }

    res.status(400).json({ message: error.message })
  }
})

// Update skill (protected)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true },
    )

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" })
    }

    res.json(skill)
  } catch (error) {
    console.error("Error updating skill:", error)

    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Skill not found" })
    }

    res.status(400).json({ message: error.message })
  }
})

// Delete skill (protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" })
    }

    res.json({ message: "Skill removed" })
  } catch (error) {
    console.error("Error deleting skill:", error)

    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Skill not found" })
    }

    res.status(500).json({ message: "Server error" })
  }
})

export default router

