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
    email:{
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Not_Process",
        enum: ["Not_Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
    tracking:{ 
        type : String,
        default : "No Tracking",
    },
},{ timestamps: true }
)

export default mongoose.model("Preorder",preorderSchema)