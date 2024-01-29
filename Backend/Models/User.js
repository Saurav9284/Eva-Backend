const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  vehicle_type: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel}
