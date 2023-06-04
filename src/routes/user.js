const express = require('express');
const router = express.Router();

const UserControllers = require('../app/controllers/UserControllers');
const AuthControlllers = require('../app/controllers/AuthControllers');

router.get('/videos', UserControllers.showListVideos);
router.get('/userProfile', UserControllers.showUserProfile);
router.get('/suggestAccounts', UserControllers.showSuggestAccounts);

module.exports = router;
