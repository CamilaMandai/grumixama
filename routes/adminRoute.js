const express = require("express");
const router = express.Router();
const Receita = require("../models/Receitas.js");
const Blogpost = require("../models/Blogpost.js");

router.get("/",async(req,res)=>{
  if(req.session.user_id){
    try{
          const receitas = await Receita.find({});
          const blogposts = await Blogpost.find({});
          res.render("admin",{receitas:receitas,blogposts:blogposts})
        }
    catch(err){console.log(err);}
  }
  else{res.redirect("/login");}
})

router.post("/logout",(req,res)=>{
  req.session.destroy((err)=>{
    if(err){ console.log(err);}
    else  res.redirect("/");
  })
})

module.exports = router;
