var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

router.get('/get_all_user', userController.showUser);

router.post('/user_login', userController.userLogin);

router.get('/check_login_status', userController.checkLoginStatus);

router.get('/get_user_info_by_id', userController.getUserInfoById);

router.get('/check_is_email_avalible', userController.checkIsEmailAvalible);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
