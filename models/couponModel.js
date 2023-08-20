import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase : true,
    },
    slug: {
        type: String,
        required: true,
    },
    expiry: {
        type: Date,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
},{ timestamps: true }
);

export default mongoose.model("Coupons", couponSchema);