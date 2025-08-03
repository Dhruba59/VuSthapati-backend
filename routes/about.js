import express from "express";
import AboutUs from "../models/About.js"; // Adjust the import path as necessary

const router = express.Router();

// GET /api/aboutus (fetch about us details)
router.get("/", async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne().select("-__v");
    if (!aboutUs) {
      return res.status(404).json({ message: "About Us not found" });
    }
    res.json(aboutUs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/aboutus (update about us details)
router.put("/", async (req, res) => {
  try {
    const { name, description1, description2, description3 } = req.body;
    
    const updatedAboutUs = await AboutUs.findOneAndUpdate(
      {},
      { name, description1, description2, description3 },
      { new: true }
    );

    if (!updatedAboutUs) {
      return res.status(404).json({ message: "About Us not found" });
    }

    res.json(updatedAboutUs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/aboutus/featured-images (update featured images)
router.put("/featured-images", async (req, res) => {
  try {
    const images = req.body; // images: [{ url, deleteUrl }]
    
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: "Images must be a non-empty array." });
    }

    const updated = await AboutUs.findOneAndUpdate(
      {},
      { $set: { featuredImages: images  } },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/about-images", async (req, res) => {
  try {
    const images  = req.body; // images: [{ url, deleteUrl }]
    
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: "Images must be a non-empty array." });
    }

    const updated = await AboutUs.findOneAndUpdate(
      {},
      { $set: { aboutUsImages:  images } },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


