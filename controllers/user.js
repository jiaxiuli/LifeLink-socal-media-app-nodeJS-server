// 引用用户模版数据
const User = require('../models/user.js');

const userController = {
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
        if (user.password === password) {
            req.session[`${user.id}_loginStatus`] = true;
            res.send({
                code: 200,
                message: "登陆成功",
                data: {
                    loginSuccess: true,
                    user
                }
            })
        } else {
            res.send({
                code: 200,
                message: "用户名或密码错误",
                data: {
                    loginSuccess: false,
                }
              })
        }
      }catch(e){
        res.send({ code: 0, message: "操作失败", data: e })
      }
  },

  checkLoginStatus: async function(req, res) {
    const id = req.query.id;
    const loginStatus = req.session[`${id}_loginStatus`];
    if (loginStatus) {
        req.session[`${id}_loginStatus`] = true;
    }
    res.send({
        code: 200,
        message: "",
        data: {
            loginStatus
        }
    })
  },
}

module.exports = userController;