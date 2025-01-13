const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Link = require("../models/LinkModel");
const dotenv = require('dotenv')
require('dotenv').config();


//creating database
const databaseUrl = process.env.MONGO_URI; // Load from .env

const main = async () => {
  try {
    await mongoose.connect(databaseUrl); // No need for useNewUrlParser and useUnifiedTopology
    console.log("Database server connected");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

main();

Link.deleteMany({}).then((res)=>{console.log(res)}).catch((err)=>{console.log(err);});
    
console.log("here");
const defaultlink = {originalLink:"adhifgsui",shortLink:"rfwsyutf",clickCount:3};
Link.insertMany([defaultlink]);