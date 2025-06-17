import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

//get all contact information
router.get("/", async (req, res) => {
  console.log('hitting')
  try {
    const contactInfo = await Contact.findOne({}).select("-__v");
    if (!contactInfo) {
      return res.status(404).json({ message: "Contact information not found" });
    }
    res.json(contactInfo); 
  } catch (error) {
    console.error("Error fetching contact information:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

