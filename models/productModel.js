import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
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
    quantity: {
        type: Number,
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
    // member: {
    //     type: mongoose.ObjectId,
    //     ref: "Member",
    //     required: true,
    // },
    collectiongroup: {
        type: mongoose.ObjectId,
        ref: "Collectiongroup",
        required: true,
    },
    shipping: {
        type: Boolean,
    },
},{ timestamps: true }
);

export default mongoose.model("Products", productSchema);