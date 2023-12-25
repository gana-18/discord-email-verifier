const mongoose=require('mongoose')

const emailSchema=new mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
},{timestamps:true})

const Email=mongoose.model('Email',emailSchema)
module.exports=Email