const Base = require('./base');

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
}

module.exports = new ProfilePhoto();