const express = require('express');
const router = express.Router();

const HomeControllers = require('../app/controllers/HomeControllers');

router.get('/', HomeControllers.show);

module.exports = router;
