var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const profilePhotoController = require('../controllers/ProfilePhoto');
const catagoryController = require('../controllers/Catagory');
const articleController = require('../controllers/Article');

router.get('/get_all_user', userController.showUser);

router.post('/user_login', userController.userLogin);

router.get('/check_login_status', userController.checkLoginStatus);

router.get('/get_user_info_by_id', userController.getUserInfoById);

router.get('/check_is_email_avalible', userController.checkIsEmailAvalible);

router.post('/user_register', userController.userRegister);

router.post('/upload_profile_photo', profilePhotoController.uploadProfilePhoto);

router.get('/get_profile_photo', profilePhotoController.getProfilePhotoById);

router.post('/update_user_info', userController.updateUserInfo);

router.get('/get_all_catagory', catagoryController.getAllCatagory);

router.post('/post_an_article', articleController.uploadArticle);

router.post('/get_articles_from_userList', articleController.getArticlesFromUserList);

router.get('/get_followed_user_info', userController.getFollowedUserInfo);

router.post('/update_article_info', articleController.updateArticleInfo);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
