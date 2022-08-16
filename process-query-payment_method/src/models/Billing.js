const mongoose = require('mongoose');

let billingShema = new mongoose.Schema({
  id: String,
  address: String,
  ciudad: String,
  departamento: String,
  telefono: String,
  razon_social: String
});

const Billing = mongoose.model('Billing', billingShema);

module.exports = Billing;
