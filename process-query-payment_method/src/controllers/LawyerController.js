const Lawyer = require('../models/Lawyer');
const helpers = require('./helpers');

const validParams = ['name', 'phone', 'email', 'uid'];

function find(req, res, next) {
  Lawyer.findById(req.params.id)
    .then((lawyer) => {
      req.lawyer = lawyer;
      next();
    })
    .catch((err) => {
      next(err);
    });
}
function findByEmail(req, res, next) {
  let { email } = helpers.buildParams(validParams, req.body);
  Lawyer.findOne({ email: email })
    .then((lawyer) => {
      req.lawyer = lawyer;
      res.json(lawyer);
    })
    .catch((err) => {
      res.json(err);
    });
}
function index(req, res) {
  Lawyer.find({})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
}
function show(req, res) {
  res.json(req.lawyer);
}
function create(req, res, next) {
  let params = helpers.buildParams(validParams, req.body);
  Lawyer.create(params)
    .then((lawyer) => {
      res.json(lawyer);
      req.lawyer = lawyer;
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error
      });
    });
}
function update(req, res) {
  req.lawyer = Object.assign(req.lawyer, req.body);
  req.lawyer
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}
function destroy(req, res) {
  req.lawyer
    .remove()
    .then((doc) => {
      res.json({});
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

module.exports = { index, show, create, update, destroy, find, findByEmail };
