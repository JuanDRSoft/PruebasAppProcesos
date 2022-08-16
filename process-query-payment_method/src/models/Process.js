const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

let processShema = new mongoose.Schema({
  filingNumber: String,
  lastUpdateDate: Date,
  lastUpdateDatePrevious: Date,
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer'
  },
  idProceso: String,
  despacho: String,
  departamento: String,
  sujetosProcesales: String,
  ciudad: String,
  state: {
    type: Boolean,
    default: true
  },
  creado: {
    type: Date,
    default: Date.now()
  },
  notificationWeb: {
    type: Boolean,
    default: false
  },
  notificationHome: {
    type: Boolean,
    default: false
  }
});

processShema.plugin(mongoosePaginate);

const Process = mongoose.model('Process', processShema);

module.exports = Process;
