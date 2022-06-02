const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");



const methodOverride = require ('method-override');
app.use(methodOverride("_method"));
app.use(session({secret:"grumixama e uma fruta", resave:true,saveUninitialized:true}));

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")))

mongoose.connect("mongodb://localhost:27017/grumixama",{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

mongoose.connection.on("error",console.error.bind(console,"connection error:"));
mongoose.connection.once("open", ()=>{
  console.log("Database connected");
});



//Import routes
const home = require("./routes/homeRoute.js");
const receitas = require("./routes/receitasRoute.js");
const blog = require("./routes/blogRoute.js");
const login = require("./routes/login.js");
const admin = require("./routes/adminRoute.js");
// Midlewares
app.use("/", home);
app.use("/receitas", receitas);
app.use("/blog", blog);
app.use("/login", login);
app.use("/admin", admin);




app.listen(3000, ()=>{
  console.log("Server up and running on port 3000");
})
