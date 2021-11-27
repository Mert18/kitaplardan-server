const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  authorId: String,
  quote: String,
  book: String,
  publisher: String,
});

module.exports = mongoose.model("Quote", quoteSchema);
