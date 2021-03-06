// 引用用户模版数据
const User = require('../models/user.js');
const async = require('async');

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
        const email = req.body.email;
        const password = req.body.password;
        const userList = await User.selectUserByEmail(email);
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

  getUserInfoById: async function(req, res) {
    try {
        const id = req.query.id;
        const userList = await User.selectUserById(id);
        const user = userList[0];
        if (user) {
            res.send({
                code: 200,
                message: "获取成功",
                data: user
            })
        } else {
            res.send({
                code: 0,
                message: "获取失败",
                data: {}
            })
        }
    }catch(e){
        res.send({ code: 0, message: "操作失败", data: e })
      }
  },

  checkIsEmailAvalible: async function(req, res) {
    try {
      const email = req.query.email;
      const userList = await User.selectUserByEmail(email);
      console.log(userList);
      if (!userList.length) {
          res.send({
              code: 200,
              message: "email avalible",
              data: true
          })
      } else {
          res.send({
              code: 201,
              message: "email is registered",
              data: false
          })
      }
  }catch(e){
      res.send({ code: 0, message: "操作失败", data: e })
    }
  },

  userRegister: async function(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const nullArr = JSON.stringify([]);
      const result = await User.insertNewUser({
        email,
        password,
        pic_id: 8,
        articles: nullArr,
        follow: nullArr,
        follower: nullArr
      });
      res.send({
        code: 200,
        message: "create success",
        data: false
    })
    }catch(e){
      res.send({ code: 0, message: "操作失败", data: e })
    }
  },

  updateUserInfo: async function (req, res) {
    try {
      const userId = req.body.userId;
      const change = req.body.info;
      if (userId && change) {
        const result = await User.updateUserInfo(userId, change);
        res.send({
          code: 200,
          message: "update success",
          data: result
        })
      } else {
        res.send({
          code: 201,
          message: "获取用户id和更新对象失败",
          data: {}
        })
      }
    } catch (e) {
      res.send({ code: 0, message: "操作失败", data: e })
    }
  },

  getFollowedUserInfo: async function (req, res) {
    try {
      const userListStr = req.query.userListStr;
      const userList = JSON.parse(userListStr);
      async.map(userList, async (userId) => {
        const uList = await User.selectUserById(userId);
        const u = uList[0];
        u.password = '';
        return u;
      }, (err, result) => {
        if (result) {
          res.send({
            code: 200,
            message: "获取关注列表信息成功",
            data: result
          })
        } else {
          res.send({
            code: 0,
            message: "获取关注列表信息失败",
            data: result
          })
        }
      });
    } catch (e) {
      res.send({ code: 0, message: "操作失败", data: e })
    }
  }
}

module.exports = userController;