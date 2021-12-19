const Base = require('./base');

class ProfilePhoto extends Base {
  // 定义参数默认值为 user 表
  constructor(props = 'profilephoto'){
    super(props);
  }
}

module.exports = new ProfilePhoto();