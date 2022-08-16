const mongoose = require('mongoose');

let ipnShema = new mongoose.Schema({ resource: String, topic: String });

const IPN = mongoose.model('IPN', ipnShema);

module.exports = IPN;
