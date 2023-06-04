const express = require('express');
const router = express.Router();

const AuthControlllers = require('../app/controllers/AuthControllers');

router.post('/login', AuthControlllers.login);
router.post('/register', AuthControlllers.register);

module.exports = router;
