import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.ObjectId,
                ref: "Products",
            },
        ],
        payment: {},
        buyer: {
            type: mongoose.ObjectId,
            ref: "Users",
        },
        status: {
            type: String,
            default: "Not_Process",
            enum: ["Not_Process", "Processing", "Shipped", "deliverd", "cancel"],
        },
        tracking:{ 
            type : String,
            default : "No Tracking",
        }
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);