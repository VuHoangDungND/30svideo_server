const express = require('express');
const router = express.Router();

const UserControllers = require('../app/controllers/UserControllers');

router.get('/videos', UserControllers.showListVideos);
router.get('/userProfile', UserControllers.showUserProfile);
router.get('/suggestAccounts', UserControllers.showSuggestAccounts);
router.post('/login', UserControllers.login);
router.post('/register', UserControllers.register);
router.get('/', UserControllers.show);

module.exports = router;
