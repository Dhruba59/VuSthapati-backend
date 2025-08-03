import mongoose from "mongoose";

const AbousUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    description1: {
        type: String,
        required: true,
        trim: true,
    },
    description2: {
        type: String,
        required: true,
        trim: true,
    },
    description3: {
        type: String,
        required: true,
        trim: true,
    },
    featuredImages: [{
        url: {
            type: String,   
            required: true,
        },
        deleteUrl: {
            type: String,
            default: null,
        },
    }],
    aboutUsImages: [{
        url: {
            type: String,   
            required: true,
        },
        deleteUrl: {
            type: String,
            default: null,
        },
    }]
    }, { timestamps: true });

const AboutUs = mongoose.model("AboutUs", AbousUsSchema);
export default AboutUs;