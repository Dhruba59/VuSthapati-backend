import mongoose from "mongoose";
import { describe } from "node:test";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    tags: {
        type: [String],
        required: false,
        trim: true,
    },
    imageUrls: {
        type: [String],
        required: false,
    },
}, { timestamps: true })

const News = mongoose.model("News", newsSchema);
export default News;