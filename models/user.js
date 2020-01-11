const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type:String,required: true},
  character_ids: {type:String, default: undefined}
});

const User = mongoose.model("User",userSchema);

module.exports = User;