const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Supplier Schema
const SupplierSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  company: { type: String, required: true }, // name
  handle: { type: String, required: true, max: 40 }, // url route
  brandLogo: { type: String }, // logo image
  profileCover: { type: String }, // background image
  email: { type: String, required: true }, // commercial email
  description: { type: String }, // bio
  state: { type: String, required: true },
  city: { type: String, required: true },
  addressCode: { type: String, required: true }, // CEP, ZIP Code
  address: { type: String, required: true }, // number street
  location: { type: String }, // GPS maps
  website: { type: String },
  phones: [{
    number: { type: String },
    whatsapp: { type: Boolean, default: true },
  }],
  serviceArea: [{
    state: { type: String, required: true },
    city: { type: String, required: true },
  }],
  social: {
    facebook: { type: String },
    instagram: { type: String },
    youtube: { type: String },
  },
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

const Supplier = mongoose.model('supplier', SupplierSchema);

module.exports = Supplier;
