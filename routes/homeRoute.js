const express = require("express");
const router = express.Router();
const Receita = require("../models/Receitas.js");


// const router= express(); ainda nao sei pq nao se usa assim

//home route "/"

router.get("/",async(req,res)=>{
  try{
  const receitas = await Receita.find();
  res.render("home",{receitas:receitas});
      }catch(err){
        console.log(err);
      };
});


module.exports = router;
