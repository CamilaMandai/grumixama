const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Receita = require("../models/Receitas.js");
const _ = require("lodash");

// route "/receitas"

//Index
router.get("/", async(req,res)=>{
  try{
      const receitas = await Receita.find({});
      res.render("receitas",{receitas});
    }catch(err){console.log(err);}
})

//new
router.get("/new", (req,res)=>{
  if(req.session.user_id){
    res.render("criar-receita");
  }
  else{res.redirect("/login")}
})

//create
router.post("/", async(req,res)=>{
  // console.log(req.body.titulo);
  const novaReceita = new Receita({
    postagem:{
      titulo:req.body.titulo,
      urlImagem:req.body.urlImagem,
      tempoPreparo:req.body.tempoPreparo,
      tempoCozimento:req.body.tempoCozimento,
      rendimento:req.body.rendimento,
      ingredientes:req.body.ingredientes,
      preparo:req.body.preparo
    },
    tituloReduzido:req.body.tituloReduzido,
    banner:{
      tituloBanner:req.body.tituloBanner,
      urlBannerImg:req.body.urlBannerImg,
      reacao:req.body.reacao,
      chamada:req.body.chamada
    },
    card:{
      descricao:req.body.descricao,
      urlImagem:req.body.cardUrlImagem
    },
    categoria:req.body.categoria,
    tags:req.body.tags
  })
  try{
    await novaReceita.save();
    res.redirect("/receitas");
  }
  catch(err){
    console.log(err);
  }
  // const novaReceita = new Receita(req.body);
});

//show
router.get("/:receita",async(req,res)=>{
  const receita = req.params.receita;
  try{
    const receitas = await Receita.find({});
    for(let r of receitas){
      if(_.kebabCase(r.postagem.titulo) === receita){
        res.render("pagina-receita", {receita:r});
        break;
      }
    }
  }catch(err){console.log(err);}
})

//edit
router.get("/:receitaId/edit", async(req,res)=>{
  const id = req.params.receitaId;
  try{
    const receita = await Receita.findById(id);
    res.render("edit-receita",{receita})
  }catch(err){console.log(err);}
})

//update
router.put("/:receitaId", async(req,res)=>{
  const id = req.params.receitaId;
  try{
    const receita = await Receita.findByIdAndUpdate(id, {
      postagem:{
        titulo:req.body.titulo,
        urlImagem:req.body.urlImagem,
        tempoPreparo:req.body.tempoPreparo,
        tempoCozimento:req.body.tempoCozimento,
        rendimento:req.body.rendimento,
        ingredientes:req.body.ingredientes,
        preparo:req.body.preparo
      },
      tituloReduzido:req.body.tituloReduzido,
      banner:{
        tituloBanner:req.body.tituloBanner,
        urlBannerImg:req.body.urlBannerImg,
        reacao:req.body.reacao,
        chamada:req.body.chamada
      },
      card:{
        descricao:req.body.descricao,
        urlImagem:req.body.cardUrlImagem
      },
      data:req.body.data,
      categoria:req.body.categoria,
      tags:req.body.tags
    },{new:true});
    res.redirect("/receitas/"+_.kebabCase(receita.postagem.titulo));
  }catch(err){
    console.log(err);
  }
})

//Destroy
router.delete("/:receitaId", async(req,res)=>{
  try{
    const id = req.params.receitaId;
    await Receita.findByIdAndDelete(id);
    res.redirect("/receitas");
  }catch(err){console.log(err);}
})



// //////////////////////////////////////////////////////////
// /receitas/categoria/:course /////////////////////////////
// /////////////////////////////////////////////////////////
router.get("/categoria/:course", async(req,res)=>{
  const course = req.params.course;
  let courseReceitas =[];
  try{
    const receitas = await Receita.find({});
    for(let receita of receitas){
      if(_.kebabCase(receita.categoria)===course){
        courseReceitas.push(receita);
      }
    }
    res.render("categoria-receitas",{courseReceitas});
  }catch(err){console.log(err);}
})


module.exports = router;
