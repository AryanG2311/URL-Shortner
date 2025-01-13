const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    originalLink:{
        type:String,
        required:true,
    },
    shortLink:{
        type:String,
        required:true,
    },
    clickCount:{
        type:Number,
        required:true,

    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const Link = mongoose.model("Link",LinkSchema);
module.exports = Link;