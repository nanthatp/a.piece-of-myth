import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    address: {
        type:String,
        default: "Please Input Your Address",
    },
    postalcode: {
        type:String,
        default: null,
    },
    province: {
        type:String,
        default: null,
    },
    role:{
        type:Number,
        default:0,
        enum: ["0", "1"],
    }
},{timestamps:true})

export default mongoose.model(`Users`,userSchema)