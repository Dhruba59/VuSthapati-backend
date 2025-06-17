import express from "express"
import Project from "../models/Project.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

// Get all projects
router.get("/", async (req, res) => {
  try {
    const filter = req.query.type ? { type: req.query.type } : {}
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 }).select("-__v")

    res.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).select("-__v")

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    res.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)

    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Project not found" })
    }

    res.status(500).json({ message: "Server error" })
  }
})

// Create new project (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newProject = new Project(req.body)
    const project = await newProject.save()

    res.status(201).json(project)
  } catch (error) {
    console.error("Error creating project:", error)
    res.status(400).json({ message: error.message })
  }
})

// Update project (protected)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true },
    )

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    res.json(project)
  } catch (error) {
    console.error("Error updating project:", error)

    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Project not found" })
    }

    res.status(400).json({ message: error.message })
  }
})

// Delete project (protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    res.status(200).json({ message: "Project removed" })
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Project not found" })
    }

    res.status(500).json({ message: "Server error" })
  }
})

export default router

// Get featured projects
router.get("/featured", async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 }).select("-__v")

    res.json(projects)
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    res.status(500).json({ message: "Server error" })
  }
})