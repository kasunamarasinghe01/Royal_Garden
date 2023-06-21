const express = require("express");
const router = express.Router();

const authControllers = require('../controlers/authContrallers');

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);
router.post('/user', authControllers.authUser);

module.exports = router;