import mongoose from "mongoose";

const sizepostcardSchema = new mongoose.Schema({
    size_postcard_name:{
        type:String,
        required:true,
        unique:true,
    },
    slug: {
        type: String,
        lowercase: true, 
    },   

});
export default mongoose.model('SizePostcard', sizepostcardSchema);