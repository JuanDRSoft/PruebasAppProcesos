var express = require('express');
var router = express.Router();

const BillingController = require('../controllers/BillingController');
const auth = require('../middleware/auth');

router.route('/').get(BillingController.index).post(BillingController.create);

router
  .route('/:id')
  .get(auth, BillingController.find, BillingController.show)
  .put(BillingController.find, BillingController.update)
  .delete(BillingController.find, BillingController.destroy);

module.exports = router;
