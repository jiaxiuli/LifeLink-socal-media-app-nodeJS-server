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
}

module.exports = studentController;
