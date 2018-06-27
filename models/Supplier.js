const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Supplier Schema
const SupplierSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  company: { type: String, required: true }, // name
  path: { type: String, required: true, max: 40 }, // url route
  brandLogo: { type: String }, // logo image
  profileCover: { type: String }, // background image
  description: { type: String }, // bio
  state: { type: String, required: true },
  city: { type: String, required: true },
  addressCode: { type: String }, // CEP, ZIP Code
  address: { type: String }, // number street
  location: { type: String }, // GPS maps
  website: { type: String },
  phones: [String],
  serviceAreas: [String],
  social: {
    facebook: { type: String },
    instagram: { type: String },
    youtube: { type: String },
  },
  services: [
    {
      title: { type: String, required: true },
      description: { type: String },
      priceType: { type: String },
      priceValue: { type: Number },
    },
  ],
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

const Supplier = mongoose.model('supplier', SupplierSchema);

module.exports = Supplier;
