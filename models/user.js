const Base = require('./base');
const knex = require('../models/knex');

class User extends Base {
  // 定义参数默认值为 user 表
  constructor(props = 'user'){
    super(props);
  }

  selectUserByEmail (email) {
    return knex(this.table).where('email', '=', email);
  }

  selectUserByUsername (username) {
    return knex(this.table).where('username', '=', username);
  }

  selectUserById (id) {
    return knex(this.table).where('id', '=', id);
  }

  insertNewUser(info) {
    return knex(this.table).insert({
      email: info.email,
      password: info.password
    });
  }

}

module.exports = new User();