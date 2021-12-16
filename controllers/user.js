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
        let user = await User.selectUser(username);
        if (user[0].password === password) {
            res.json({
                code: 200,
                message: "登陆成功",
                data: {
                    loginSuccess: true
                }
              })
        } else {
            res.json({
                code: 200,
                message: "用户名或密码错误",
                data: {
                    loginSuccess: false
                }
              })
        }
      }catch(e){
        res.json({ code: 0, message: "操作失败", data: e })
      }
  }
}

module.exports = userController;