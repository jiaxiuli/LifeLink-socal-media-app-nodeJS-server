var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const profilePhotoController = require('../controllers/ProfilePhoto');

router.get('/get_all_user', userController.showUser);

router.post('/user_login', userController.userLogin);

router.get('/check_login_status', userController.checkLoginStatus);

router.get('/get_user_info_by_id', userController.getUserInfoById);

router.get('/check_is_email_avalible', userController.checkIsEmailAvalible);

router.post('/user_register', userController.userRegister);

router.post('/upload_profile_photo', profilePhotoController.uploadProfilePhoto);

router.get('/get_profile_photo', profilePhotoController.getProfilePhotoById);

router.post('/update_user_info', userController.updateUserInfo);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
