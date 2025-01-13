//linking this with database
const mongoose = require('mongoose');

// //require routes
const linkroute =require("./routes/linkroute.js");
//env
const dotenv = require('dotenv')
require('dotenv').config();

// //requirimg model
const Link = require("./models/LinkModel.js");

//express
const express = require("express");
const app = express();
let port =process.env.PORT || 2626;
app.listen(port , ()=> {
console.log(`listning on port :${port}`);

});

//ejs setup
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//ejs mate setup
const ejsMate = require("ejs-mate");
app.engine("ejs",ejsMate);
//for req.body to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//mothod override
const methodOverride = require('method-override')
app.use(methodOverride('_method'));



app.use(express.static("public"));  

//database
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


//checking local host
app.get("/",(req,res)=>{
res.send("Local host working");
})



//creating crud api's
app.get("/home",async(req,res)=>{
  res.render("main.ejs");
;})

app.use("/", linkroute);



app.use((err,req,res,next)=>{
    console.log("some error occured");
    res.render("error.ejs");    
console.log(err.name , "mess" , err);
next();

})

app.get("/error404", (req,res)=>{

    res.render("error.ejs");

})