var express = require('express');
var router = express.Router();
const studentController = require('../controllers/student');
const userController = require('../controllers/user');

// 获取所有用户信息
router.get('/get_all_student', studentController.showStudent);

// 获取所有学生信息
router.get('/get_all_user', userController.showUser);

router.post('/user_login', userController.userLogin);

router.get('/check_login_status', userController.checkLoginStatus);

router.get('/get_user_info_by_id', userController.getUserInfoById)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
