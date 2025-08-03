import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

//get all contact information
router.get("/", async (req, res) => {
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

// Update contact information
router.put("/", async (req, res) => {
  try {
    const { name, primaryEmail, secondaryEmails, primaryPhone, secondaryPhones, googleMapAddress, address, website, twitter, instagram, facebook, linkedin } = req.body;

    const updatedContact = await Contact.findOneAndUpdate(
      {},
      { name, primaryEmail, secondaryEmails, primaryPhone, secondaryPhones, googleMapAddress, address, website, twitter, instagram, facebook, linkedin },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact information not found" });
    }
    res.json(updatedContact);
  } catch (error) {
    console.error("Error updating contact information:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

