import mongoose from "mongoose";
import slugify from "slugify";

export const categorySchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
    unique:true
},
slug:{
    type:String,
    lowercase:true
},



})

export default mongoose.model("category",categorySchema);