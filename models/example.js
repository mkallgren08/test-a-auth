const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exampleSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  url: { type: String, required: false }
});

const Example = mongoose.model("Example", exampleSchema);

module.exports = Example;
