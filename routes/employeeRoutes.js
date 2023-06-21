const express = require('express');
const { createNewEmployee, getAllEmployees } = require('../controlers/employeeControllers');
const router = express.Router();


router.post('/', createNewEmployee );
router.get('/', getAllEmployees);



module.exports = router;