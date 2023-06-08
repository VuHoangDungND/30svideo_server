const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const UserControllers = require('../app/controllers/UserControllers');
const AuthControlllers = require('../app/controllers/AuthControllers');

router.get('/videos', UserControllers.showListVideos);
router.get('/userProfile', UserControllers.showUserProfile);
router.get('/suggestAccounts', UserControllers.showSuggestAccounts);
router.post(
    '/uploadVideo',
    AuthControlllers.verifyToken,
    upload.single('file'),
    UserControllers.uploadVideo,
);
router.get('/', AuthControlllers.verifyToken, UserControllers.showUser);

module.exports = router;
