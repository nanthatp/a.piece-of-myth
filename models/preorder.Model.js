import mongoose from "mongoose";

const preorderSchema = new mongoose.Schema({
    preproduct: [
        {
            type: mongoose.ObjectId,
            ref: "Preproduct",
        },
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "Users",
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
},{ timestamps: true }
)

export default mongoose.model("Preorder",preorderSchema)