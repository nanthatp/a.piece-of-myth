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
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
    //เดี๋ยวมาต่อ
})

export default mongoose.model("Preorder",preorderSchema)