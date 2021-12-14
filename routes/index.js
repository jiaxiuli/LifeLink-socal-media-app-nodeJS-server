var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

// 获取用户信息
router.get('/get_user', userController.showUser);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
