// 引用用户模版数据
const ProfilePhoto = require('../models/ProfilePhoto.js');
const User = require('../models/user.js');

const profilePhotoController = {

    uploadProfilePhoto: async function (req, res) {
        const photoStr = req.body.photoStr;
        const userId = req.body.userId;
        if (photoStr) {
            try{
                const result = await ProfilePhoto.uploadProfilePhoto(photoStr);
                const picId = result[0];
                const user = await User.addProfilePhotoById(picId, userId);
                res.send({ code: 200, message: "上传成功", data: {
                    picId: result[0],
                    user
                } });
            }catch(e){
                res.json({ code: 0, message: "操作失败", data: e })
            }
        } else {
            res.send({ code: 0, message: "上传失败", data: '' });
        }
    },

    getProfilePhotoById: async function(req, res) {
        const picId = req.query.picId;
        if (picId) {
            try{
                const pic = await ProfilePhoto.getProfilePhoto(picId);
                res.send({ code: 200, message: "获取成功", data: {
                    pic: JSON.parse(JSON.stringify(pic))[0].picture
                }});
            }catch(e){
                res.json({ code: 0, message: "操作失败", data: e })
            }
        } else {
            res.send({ code: 0, message: "获取用户id失败", data: '' });
        }
    }
}
module.exports = profilePhotoController;