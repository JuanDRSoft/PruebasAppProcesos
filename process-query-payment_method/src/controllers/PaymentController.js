const Payment = require('../models/Payments');
const helpers = require('./helpers');

const validParams = [
  'paymentDate',
  'lawyer',
  'amount',
  'voucher',
  'startDate',
  'endDate'
];

function find(req, res, next) {
  Payment.findById(req.params.id)
    .then((payment) => {
      req.payment = payment;
      next();
    })
    .catch((err) => {
      next(err);
    });
}
function findByLawyer(req, res, next) {
  const page = req.query.page || 1;
  const limit = 10;

  Payment.paginate(
    { lawyer: req.usuario },
    { limit, page, sort: { lastUpdateDate: -1 } },
    function (err, result) {
      req.payment = payment;
      res.json(result);
    }
  );
}

function findByLawyerCount(req, res, next) {
  let payment = 0;
  let tracking = 0;

  Payment.count({ lawyer: req.usuario }).then((result) => {
    payment = result;

    Payment.count({ lawyer: req.usuario, state: true }).then((resultActive) => {
      tracking = resultActive;

      res.json([payment, tracking, payment - tracking]);
    });
  });
}
function index(req, res) {
  const options = {
    page: 1,
    limit: 1
  };

  const page = req.query.page || 1;
  const limit = 10;

  Payment.paginate({}, { limit, page }, function (err, result) {
    res.json(result);
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
}
function show(req, res) {
  res.json(req.payment);
}
async function create(req, res, next) {
  let params = helpers.buildParams(validParams, req.body);

  let payment = await Payment.findOne({ filingNumber: params.filingNumber });

  if (payment) {
    return res.status(400).json({ msg: 'El proceso ya esta registrado' });
  }

  Payment.create(params)
    .then((payment) => {
      res.json(payment);
      req.payment = payment;
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error
      });
    });
}
function update(req, res) {
  req.payment = Object.assign(req.payment, req.body);
  req.payment
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
  req.payment
    .remove()
    .then((doc) => {
      res.json({});
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function updateState(req, res) {
  Payment.find({})
    .then((doc) => {
      doc.map(async (dc) => {
        const pro = await Payment.findById(dc._id);
        pro.state = true;
        await pro.save();
      });
    })
    .catch((err) => {
      res.json(err);
    });
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  find,
  findByLawyer,
  findByLawyerCount,
  updateState
};
