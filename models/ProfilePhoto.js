const Base = require('./base');
const knex = require('../models/knex');
class ProfilePhoto extends Base {
  // 定义参数默认值为 user 表
  constructor(props = 'profilephoto'){
    super(props);
  }

  uploadProfilePhoto (photoStr) {
    return knex(this.table).insert({
      picture: photoStr
    });
  }

  getProfilePhoto (picId) {
    return knex(this.table).where('id', '=', picId).select('picture');
  }
}

module.exports = new ProfilePhoto();