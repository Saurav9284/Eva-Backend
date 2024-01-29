const mongoose = require('mongoose');

const petrolSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  odometer_reading: { type: Number, required: true },
  petrol_price: { type: Number, required: true },
  petrol_volume: { type: Number, required: true },
  station: {
    type: String, required: true, enum: ['Shell', 'Bharat-petroleum', 'HP']},
});

const PetrolModel = mongoose.model('Petrol', petrolSchema);


module.exports = {PetrolModel}

