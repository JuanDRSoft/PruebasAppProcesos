const mongoose = require('mongoose');

let lawyerShema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  uid: String,
  state: {
    type: Boolean,
    default: true
  }
});

const Lawyer = mongoose.model('Lawyer', lawyerShema);

module.exports = Lawyer;
