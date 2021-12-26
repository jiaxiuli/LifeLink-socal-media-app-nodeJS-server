// 引用用户模版数据
const Catagory = require('../models/catagory');

const catagoryController = {
    getAllCatagory: async function (req, res) {
        try {
            const catagories = await Catagory.all();
            res.send({
                code: 200,
                message: "操作成功",
                data: catagories
              });
        } catch {
            res.send({
                code: 0,
                message: "操作失败",
              });
        }
    }
}

module.exports = catagoryController;