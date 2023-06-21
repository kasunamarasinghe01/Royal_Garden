const express = require('express');
const { getAllCustomers } = require('../controlers/customerControllers');
const router = express.Router();

router.get('/', getAllCustomers);




module.exports = router;