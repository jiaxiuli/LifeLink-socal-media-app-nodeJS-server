var express = require('express');
var router = express.Router();
const studentController = require('../controllers/student');

// 获取用户信息
router.get('/get_all_student', studentController.showStudent);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
