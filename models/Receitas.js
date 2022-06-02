const mongoose = require("mongoose");

const receitaSchema = new mongoose.Schema({
  postagem:{
    titulo:String,
    urlImagem:String,
    tempoPreparo:Number,
    tempoCozimento:Number,
    rendimento:Number,
    ingredientes:[String],
    preparo:[String]
  },
  tituloReduzido:String,
  banner:{
    tituloBanner:String,
    urlBannerImg:String,
    reacao:String,
    chamada:String
  },
  resumo:{
    descricao:String,
    urlImagem:String
  },
  data:{
    type:Date,
    default: Date.now
  },
  categoria:{
    type:String,
    lowercase:true,
    enum:['café da manhã', 'almoço e janta', 'lanches e molhos']
  },
  tags:[String]
})

const Receita = mongoose.model("Receita", receitaSchema);

module.exports = Receita;
