import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      deleteUrl: {
        type: String,
        default: null,
      },
    },
  ],
  client: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
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
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
