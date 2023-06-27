const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const UserControllers = require('../app/controllers/UserControllers');
const AuthControlllers = require('../app/controllers/AuthControllers');

router.get('/listUserVideos', UserControllers.showListVideos);
router.get('/userProfile', AuthControlllers.verifyToken, UserControllers.showUserProfile);
router.get('/suggestAccounts', AuthControlllers.verifyToken, UserControllers.showSuggestAccounts);
router.post(
    '/uploadVideo',
    AuthControlllers.verifyToken,
    upload.single('file'),
    UserControllers.uploadVideo,
);

router.post('/likeVideo', AuthControlllers.verifyToken, UserControllers.likeVideo);
router.post('/unlikeVideo', AuthControlllers.verifyToken, UserControllers.unlikeVideo);

router.get('/showMyUser', AuthControlllers.verifyToken, UserControllers.showMyUser);
router.get('/', AuthControlllers.verifyToken, UserControllers.show);

module.exports = router;
