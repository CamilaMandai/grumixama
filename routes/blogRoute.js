const express = require("express");
const router = express.Router();
const Blogpost = require("../models/Blogpost.js");
const _ = require("lodash");
const multer = require("multer");
const upload = multer({dest: 'uploads/' });

// route "/blog"

//Index
router.get("/",async(req,res)=>{
  try{
  const postagem = await Blogpost.find();
  res.render("blog",{postagem});
      }catch(err){
        console.log(err);
      };
});

//New
router.get("/new",(req,res)=>{
  if(req.session.user_id){
  res.render("newBlogpost");
}
  else{res.redirect("/login");}
}) 

//Create
router.post("/", upload.single('foto'),(req,res)=>{
  // const post = new Blogpost({
  //   titulo: req.body.titulo,
  //   subtitulo:req.body.subtitulo,
  //   descricao:req.body.post,
  //   fotoUrl:req.body.fotoUrl,
  //   tags:req.body.tags,
  //   categoria:req.body.categoria
  // });
  // try{
  //   await post.save();
  //   res.redirect("/blog/"+_.kebabCase(post.titulo));
  // }catch(err){console.log(err);}
  console.log(req.body,req.file);
  res.send("funfou?");
});

//Show
router.get("/:blogpost",async(req,res)=>{
  try{
    const posts = await Blogpost.find({});
    for(let p of posts){
      if(_.kebabCase(p.titulo)===req.params.blogpost){
        res.render("blogpost",{post:p});
        break;
        }
    }
  }catch(err){console.log(err);}
})

//Edit
router.get("/:postId/edit", async(req,res)=>{
  if(req.session.user_id){
  //Lembrar de colocar aqui a checagem do login, e redirecionar para página de login caso nao esteja logado
  const postId  = req.params.postId;
  try{
    const post = await Blogpost.findById(postId);
    console.log(post);
    res.render("editBlogPost",{post});
  }catch(err){console.log(err);}
}
  else{res.redirect("/login")};
});

//Update
router.put("/:postId", async(req,res)=>{
    try{
      const postId = req.params.postId;
      const post = await Blogpost.findByIdAndUpdate(postId, {
        titulo:req.body.titulo,
        subtitulo:req.body.subtitulo,
        descricao:req.body.descricao,
        fotoUrl:req.body.fotoUrl,
        tags:req.body.tags,
        categoria:req.body.categoria,
        data:req.body.data
        },{new:true});
      res.redirect("/blog/"+_.kebabCase(post.titulo));
    }catch(err){console.log(err);}
})

//Destroy
router.delete("/:postId", async(req,res)=>{
    try{
      const postId = req.params.postId;
      await Blogpost.findByIdAndDelete(postId);
      res.redirect("/blog");
    }catch(err){console.log(err);}
})

module.exports = router;
