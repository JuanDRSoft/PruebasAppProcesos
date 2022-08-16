const Billing = require('../models/Billing');
const helpers = require('./helpers');

const validParams = [
  'id',
  'address',
  'ciudad',
  'departamento',
  'telefono',
  'razon_social'
];

function find(req, res, next) {
  Billing.findById(req.params.id)
    .then((billing) => {
      req.billing = billing;
      next();
    })
    .catch((err) => {
      next(err);
    });
}
function findByLawyer(req, res, next) {
  const page = req.query.page || 1;
  const limit = 10;

  Billing.paginate(
    { lawyer: req.usuario },
    { limit, page, sort: { lastUpdateDate: -1 } },
    function (err, result) {
      req.billing = billing;
      res.json(result);
    }
  );
}

function findByLawyerCount(req, res, next) {
  let billing = 0;
  let tracking = 0;

  Billing.count({ lawyer: req.usuario }).then((result) => {
    billing = result;

    Billing.count({ lawyer: req.usuario, state: true }).then((resultActive) => {
      tracking = resultActive;

      res.json([billing, tracking, billing - tracking]);
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

  Billing.paginate({}, { limit, page }, function (err, result) {
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
  res.json(req.billing);
}
async function create(req, res, next) {
  let params = helpers.buildParams(validParams, req.body);

  let billing = await Billing.findOne({ filingNumber: params.filingNumber });

  if (billing) {
    return res.status(400).json({ msg: 'El proceso ya esta registrado' });
  }

  Billing.create(params)
    .then((billing) => {
      res.json(billing);
      req.billing = billing;
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error
      });
    });
}
function update(req, res) {
  req.billing = Object.assign(req.billing, req.body);
  req.billing
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
  req.billing
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
  Billing.find({})
    .then((doc) => {
      doc.map(async (dc) => {
        const pro = await Billing.findById(dc._id);
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
