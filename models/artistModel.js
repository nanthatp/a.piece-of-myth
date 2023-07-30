import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug: {
        type: String,
        lowercase: true, 
    },   
    member: {
        type:Array,
        require:true,
    }

});
export default mongoose.model('Artist', artistSchema);