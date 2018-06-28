const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Category Schema
const CategorySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  cover: { type: String },
  rank: { type: Number },
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;
