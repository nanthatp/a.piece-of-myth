import mongoose, { Schema } from "mongoose";

const memberSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        artist: [{
            type:mongoose.ObjectId,
            ref:"Artist"
        }]
    },
    slug: {
        type: String,
        lowercase: true, 
    },   

});
export default mongoose.model('Member', memberSchema);