import mongoose from "mongoose"

const FeaturedImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    url: {
        type: String,
        required: true,
    },
    deleteUrl: {
        type: String,
        default: null,
    },
    }, { timestamps: true });

const FeaturedImage = mongoose.model("FeaturedImage", FeaturedImageSchema);

const AbousUsImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    url: {
        type: String,
        required: true,
    },
    deleteUrl: {
        type: String,
        default: null,
    },
    }, { timestamps: true });

const AbousUsImage = mongoose.model("AboutUs", AbousUsImageSchema);

// export {FeaturedImage, AbousUsImage};