import mongoose from "mongoose";

const preproductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.ObjectId,
        ref: "Category",
        required: true,
    },
    photo: {
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
        ref: "Collectiongroup",
        required: true,
    },
    until: {
        type: Date,
        require: true,
    },
    
},{ timestamps: true }
)
export default mongoose.model("Preproduct",preproductSchema)