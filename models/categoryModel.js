import mongoose from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    
});