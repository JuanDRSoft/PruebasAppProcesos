const IPN = require('../models/IPN');
const helpers = require('./helpers');

async function create(req, res, next) {
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
