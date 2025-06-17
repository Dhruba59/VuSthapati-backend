import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { authMiddleware } from "../middleware/auth.js"
import Admin from "../models/Admin.js"
import bcrypt from "bcrypt"

const router = express.Router()

// Register new user (admin only)
router.post("/register", authMiddleware, async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] })

    if (user) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
      role: role || "editor",
    })

    await user.save()

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Error registering user:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Login

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});



export default router

