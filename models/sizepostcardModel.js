import mongoose from "mongoose";

const sizepostcardSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    slug: {
        type: String,
        lowercase: true, 
    },   

});
export default mongoose.model('SizePostcard', sizepostcardSchema);