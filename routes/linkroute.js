const express = require("express");
const router = express.Router();
//requiring model
const Link = require("../models/LinkModel");
//shortlink npm module 
const shortid = require('shortid');

router.post("/shortlink/get-response",async(req,res,next)=>
{
try{
    const {originalLink}  =req.body;
    console.log(originalLink);
    let url = await Link.findOne({ originalLink });
    if (url) {

     const thislink = await Link.findOne({originalLink});
res.render("shortlink.ejs",{thislink});

    }
else{
    const shortLink = shortid.generate();
const newData  ={originalLink,shortLink,clickCount:0};
await Link.insertMany([newData]);
const thislink = await Link.findOne({originalLink});
res.render("shortlink.ejs",{thislink});
  }
  
}catch(err){
    console.log(err);
    next();
}
}
)


router.get("/:shortLink",async(req,res,next)=>{

    try{
    const{shortLink} = req.params;
    const currLink = await Link.findOne({shortLink});
    if(currLink){  
        currLink.clickCount +=1;
        await currLink.save();
        currOriginalLink = currLink.originalLink;
        res.redirect(`${currOriginalLink}`);
    
    }
    else {
        return res.status(404).json('URL not found');
      }
    }catch (err) {
        res.status(500).json('Server Error');
      }
  
})

module.exports = router;