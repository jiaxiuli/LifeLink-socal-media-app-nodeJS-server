// 引用用户模版数据
const ProfilePhoto = require('../models/ProfilePhoto.js');

const profilePhotoController = {
    uploadProfilePhoto: async function (req, res) {
        const photoStr = req.body.photoStr;
        console.log(photoStr);
           if (photoStr) {
            try{
                const result = await ProfilePhoto.uploadProfilePhoto(photoStr);
                res.send({ code: 200, message: "上传成功", data: result });
            }catch(e){
                res.json({ code: 0, message: "操作失败", data: e })
            }
           }
    }
}
module.exports = profilePhotoController;