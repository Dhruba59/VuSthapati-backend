import { Router } from "express";
import News from "../models/News.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 }).select("-__v");
        res.json(news);
    }
    catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Server error" });
    }
}
);

router.get("/:id", async (req, res) => {
    try {
        const news = await News.findById(req.params.id).select("-__v");
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        res.json(news);
    }
    catch (error) {
        console.error("Error fetching news:", error);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(500).json({ message: "Server error" });
    }
}
);

router.post("/", authMiddleware, async (req, res) => {
    try {
        const newNews = new News(req.body);
        const news = await newNews.save();
        res.status(201).json(news);
    }
    catch (error) {
        console.error("Error creating news:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(
            req.params.id, 
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        ) ;
        if(!news) {
            res.status(404).json({ message: 'News not found!'})
        }
        res.status(201).json(news);
    }
    catch (error) {
        console.error("Error creating news:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        
        if(!news) {
            res.status(404).json({ message: 'News not found'});
        }

        res.status(200).json({ message: "Project removed" })
    } catch(error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({ message: "Project not found" })
          }
      
          res.status(500).json({ message: "Server error" })
        }
        res.status(500).json({ message: "Server error" })
    }
);

export default router;