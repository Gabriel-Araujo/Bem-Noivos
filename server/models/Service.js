const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const ServiceSchema = new Schema({
  supplier: { type: Schema.Types.ObjectId, ref: 'suppliers' },
  category: { type: Schema.Types.ObjectId, ref: 'categorys' },
  title: { type: String, required: true },
  description: { type: String },
  priceType: {
    type: String,
    required: false,
    uppercase: true,
    enum: ['FIXED', 'RANGED', 'UNIT', 'STARTWITH'],
  },
  priceValue: { type: Number },
  priceMin: { type: Number },
  priceMax: { type: Number },
  tags: { type: [String] },
  rank: { type: Number },
  photos: [
    {
      filename: { type: String, required: true },
      contentType: { type: String, required: true },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Service = mongoose.model('service', ServiceSchema);
module.exports = Service;
