const express = require('express');
const router = express.Router();

const SearchControllers = require('../app/controllers/SearchControllers');

router.get('/', SearchControllers.show);

module.exports = router;
