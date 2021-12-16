// 引用用户模版数据
const User = require('../models/user.js');

const userController = {
  // showUser 获取用户数据并返回到页面
  showUser: async function(req, res){
    try{
      let userData = await User.all()
      res.json({
        code: 200,
        message: "操作成功",
        data: userData
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },

  userLogin: async function(req, res) {
    try{
        const username = req.body.username;
        const password = req.body.password;
        const userList = await User.selectUser(username);
        const user = userList[0];
        req.session.userInfo = user;
        console.log(req.session);
        if (user.password === password) {
            res.json({
                code: 200,
                message: "登陆成功",
                data: {
                    loginSuccess: true,
                    user
                }
              })
        } else {
            res.json({
                code: 200,
                message: "用户名或密码错误",
                data: {
                    loginSuccess: false,
                }
              })
        }
      }catch(e){
        res.json({ code: 0, message: "操作失败", data: e })
      }
  },

  checkLoginStatus: async function(req, res) {
    console.log(req.session);
    // console.log(req.headers);
    if (req.session.userInfo) {
        console.log('logined');
    } else {
        console.log('not login');
    }
    res.json({
        code: 200,
        message: "",
        data: {
           
        }
      })
  }
}

module.exports = userController;