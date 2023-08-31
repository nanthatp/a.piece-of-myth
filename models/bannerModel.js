import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true, 
        required: true,
    },
    file: {
        data: Buffer,
        contentType: String,
    },
    artist: {
        type: mongoose.ObjectId,
        ref: "Artist",
        required: true,
    },
    collectiongroup: {
        type: mongoose.ObjectId,
        ref: "Collection",
        required: true,
    },
},{ timestamps: true }
);

export default mongoose.model("Banners", bannerSchema);