const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bodyParser=require("body-parser");
const session = require("express-session")
router.use(bodyParser.urlencoded({extended: true}));
router.use(session({secret:"grumixama e uma fruta", resave:true,saveUninitialized:true}))



router.get("/",(req,res)=>{
  res.render("login");
})

router.post("/",async(req,res)=>{
  const {username, password} = req.body;
  const user = await User.findOne({username});
  if(user){
    const isValidPw = await User.validate(username, password);
    if(isValidPw){
      req.session.user_id = user._id;
      res.redirect('/admin')
    }
    else {
            console.log("Username and/or password invalid");
            res.redirect("/");
          }
  }
  else{
        console.log("Username and/or password incorrect");
        res.redirect("/");
      }
})

module.exports = router;
