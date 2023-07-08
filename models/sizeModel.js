import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
    size_name:{
        type:String,
        required:true,
        unique:true,
    },
    slug: {
        type: String,
        lowercase: true, 
    },   

});
export default mongoose.model('Size', sizeSchema);