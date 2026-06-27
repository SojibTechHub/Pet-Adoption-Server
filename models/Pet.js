const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  image: { type: String, required: true },
  healthStatus: { type: String, required: true },
  vaccinationStatus: { type: String, required: true },
  location: { type: String, required: true },
  adoptionFee: { type: Number, required: true },
  description: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['available', 'adopted'], default: 'available' },
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
