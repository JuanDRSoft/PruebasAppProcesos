var express = require('express');
var router = express.Router();

const IPNController = require('../controllers/IPNController');
const auth = require('../middleware/auth');

router.route('/').get(IPNController.index).post(IPNController.create);

// router
//   .route('/:id')
//   .get(auth, PaymentController.find, PaymentController.show)
//   .put(PaymentController.find, PaymentController.update)
//   .delete(PaymentController.find, PaymentController.destroy);

module.exports = router;
