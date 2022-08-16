const Process = require('../models/Process');
const Lawyer = require('../models/Lawyer');
const helpers = require('./helpers');
const axios = require('axios');

const validParams = [
  'filingNumber',
  'lastUpdateDate',
  'lastUpdateDatePrevious',
  'lawyer',
  'idProceso',
  'despacho',
  'departamento',
  'sujetosProcesales',
  'state',
  'notificationWeb',
  'notificationHome',
  'ciudad'
];

function find(req, res, next) {
  Process.findById(req.params.id)
    .then((process) => {
      req.process = process;
      next();
    })
    .catch((err) => {
      next(err);
    });
}
function findByFilingNumber(req, res, next) {
  Process.findOne({ filingNumber: req.params.id })
    .then((process) => {
      req.process = process;
      next();
    })
    .catch((err) => {
      next(err);
    });
}
function findOne(req, res, next) {
  Process.findOne({ filingNumber: req.params.id })
    .then((process) => {
      res.json(process);
    })
    .catch((err) => {
      next(err);
    });
}
function findByLawyer(req, res, next) {
  const page = req.query.page || 1;
  const limit = 10;

  console.log(req.query);

  const { selectedOrderOption } = req.query;

  const filterSelected =
    selectedOrderOption === 'activos' || selectedOrderOption === ''
      ? true
      : false;

  Process.paginate(
    {
      lawyer: req.usuario,
      filingNumber: { $regex: req.query.search, $options: '-i' },
      state: filterSelected
    },
    { limit, page, sort: { lastUpdateDate: -1 } },
    function (err, result) {
      req.process = process;
      res.json(result);
    }
  );
}

function findByLawyerCount(req, res, next) {
  let process = 0;
  let tracking = 0;

  Process.count({ lawyer: req.usuario }).then((result) => {
    process = result;

    Process.count({ lawyer: req.usuario, state: true }).then((resultActive) => {
      tracking = resultActive;

      res.json([process, tracking, process - tracking]);
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

  Process.paginate({}, { limit, page }, function (err, result) {
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
  res.json(req.process);
}
async function create(req, res, next) {
  let params = helpers.buildParams(validParams, req.body);

  let process = await Process.findOne({ filingNumber: params.filingNumber });

  if (process) {
    return res.status(400).json({ msg: 'El proceso ya esta registrado' });
  }

  Process.create(params)
    .then((process) => {
      res.json(process);
      req.process = process;
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error
      });
    });
}
function update(req, res) {
  req.process = Object.assign(req.process, req.body);
  req.process
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
  req.process
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
  Process.findOne({ filingNumber: req.params.id })
    .then((doc) => {
      doc.state = !doc.state;
      doc.save();
      res.json('ok');
    })
    .catch((err) => {
      res.json(err);
    });
}

function updateStateAll(req, res) {
  Process.find({})
    .then((doc) => {
      doc.map((proc) => {
        Process.findById(proc._id).then((end) => {
          end.state = true;
          end.save();
        });
      });

      res.json('ok');
    })
    .catch((err) => {
      res.json('err');
    });
}

async function fetchProcessFn(req, res) {
  const requestAccion = await axios.get(
    `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${req.params.id}?pagina=1`
  );
  res.json(requestAccion.data);
}

function findByLawyerAll(req, res, next) {
  Process.find({ lawyer: req.usuario })
    .sort([['lastUpdateDate', -1]])
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json('err');
    });
}
function findByLawyerCountUpdate(req, res, next) {
  Process.count({
    lawyer: req.usuario,
    state: true,
    notificationWeb: true
  }).then((result) => {
    res.json(result);
  });
}

function processbyLawyerHome(req, res) {
  Lawyer.findOne({ email: req.params.email })
    .then((doc) => {
      Process.findOne({ lawyer: doc._id })
        .sort([['lastUpdateDate', -1]])
        .then((pro) => {
          res.json(pro);
          console.log(pro);
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
  updateState,
  findOne,
  fetchProcessFn,
  findByFilingNumber,
  updateStateAll,
  findByLawyerAll,
  findByLawyerCountUpdate,
  processbyLawyerHome
};
