const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Category Schema
const NewsletterSchema = new Schema({
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

const Newsletter = mongoose.model('newsletter', NewsletterSchema);
module.exports = Newsletter;
