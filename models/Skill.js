import mongoose from "mongoose"

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["frontend", "backend", "database", "devops", "tools", "other"],
    default: "other",
  },
  level: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Skill = mongoose.model("Skill", skillSchema)

export default Skill

