const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Usuário deve ser preenchido"]
  },
  password: {
      type: String,
      required: [true, "Usuário deve ser preenchido"]
    }
})

userSchema.statics.validate = async function(username,pw){
  const user = await this.findOne({username});
  if(user){
    const isValid = await bcrypt.compare(pw, user.password);
    return isValid ? user : false;
  }
  return false
}

module.exports = mongoose.model("User",userSchema);
