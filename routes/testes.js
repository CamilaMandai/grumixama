const express = require("express");
const router = express.Router();
const Blogpost = require("../models/Blogpost.js");


// const router= express(); ainda nao sei pq nao se usa assim

router.get("/",async(req,res)=>{
  try{
  const postagem = await Blogpost.find();
  res.render("testes",{postagem});
      }catch(err){
        console.log(err);
      };
});

router.post("/", async(req,res)=>{
  const post = new Blogpost({
    titulo: req.body.titulo,
    subtitulo:req.body.subtitulo,
    descricao:req.body.post,
    fotoUrl:req.body.fotoUrl,
    tags:req.body.tags,
    categoria:req.body.categoria
  });
  try{
    await post.save();
    res.redirect("/testes");
  }catch(err){console.log(err);}
})


module.exports = router;
