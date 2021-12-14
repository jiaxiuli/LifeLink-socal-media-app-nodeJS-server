const Base = require('./base');

class Student extends Base {
  // 定义参数默认值为 user 表
  constructor(props = 'student'){
    super(props);
  }
}

module.exports = new Student();
