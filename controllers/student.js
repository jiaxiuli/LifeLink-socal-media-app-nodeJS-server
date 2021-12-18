// 引用用户模版数据
const Student = require('../models/student.js');

const studentController = {
  // showUser 获取用户数据并返回到页面
  showStudent: async function(req, res, next){
    try{
      let userData = await Student.all()
      res.json({
        code: 200,
        message: "操作成功",
        data: userData
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },

  getStudentInfoById: async function(req, res) {
    try {
      const id = req.query.id;
      const studentList = await Student.selectUserById(id);
      const student = studentList[0];
      if (student) {
          res.send({
              code: 200,
              message: "获取成功",
              data: student
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
  }
}

module.exports = studentController;
