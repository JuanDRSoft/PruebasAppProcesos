const mongoose = require('mongoose');

let paymentShema = new mongoose.Schema({
  paymentDate: Date,
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer'
  },
  amount: String,
  voucher: String,
  startDate: Date,
  endDate: Date
});

const Payments = mongoose.model('Payments', paymentShema);

module.exports = Payments;