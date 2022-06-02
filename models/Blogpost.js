const mongoose = require("mongoose");

const BlogpostSchema = new mongoose.Schema({
  titulo: String,
  subtitulo:String,
  descricao:String,
  fotoUrl:String,
  data:{
    type:Date,
    default:Date.now
  },
  tags:[String],
  categoria:{
    type:String,
    lowercase:true
  }
})

module.exports=mongoose.model("Blogpost", BlogpostSchema);
