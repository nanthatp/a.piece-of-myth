import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    slug: {
        type: String,
        lowercase: true, 
    },   

});
export default mongoose.model('Size', sizeSchema);