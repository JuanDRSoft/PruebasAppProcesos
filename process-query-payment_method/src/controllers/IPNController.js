const axios = require('axios');
const IPN = require('../models/IPN');
const helpers = require('./helpers');

const validParams = ['resource', 'topic'];

async function create(req, res, next) {
  let params = helpers.buildParams(validParams, req.body);
  IPN.create(req.body)
    .then((ipn) => {
      res.json(ipn);
      req.payment = ipn;
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error
      });
    });

  if (req.body.resource.includes('merchant_orders')) {
    const invoice = await axios.get(
      req.body.resource +
        '?access_token=APP_USR-3358235138150118-080815-8185f95057c925ac403db991da834eb0-1175458796'
    );
    if (invoice.data.status.includes('closed')) {
      const bodyData = {
        paymentDate: invoice.data.date_created,
        status: invoice.data.payments[0].status,
        lawyer: invoice.data.items[0].id,
        amount: invoice.data.total_amount,
        voucher: invoice.data.id
      };

      const payment = await axios.post(
        'https://paymenth-method.herokuapp.com/payments',
        bodyData
      );
    }
  }
}

function index(req, res) {
  IPN.find({})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
}

module.exports = { create, index };
