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

  addProfilePhotoById(picId, userId) {
    const user = knex(this.table).where('id', '=', userId).select();
    return user.update({
      pic_id: picId
    });
  }

  getProfilePhotoById(userId) {
    return knex(this.table).where('id', '=', userId).select('pic_id');
  }

  insertNewUser(info) {
    return knex(this.table).insert(info);
  }

  updateUserInfo(userId, changeInfo) {
    return knex(this.table).where('id', '=', userId).update(changeInfo);
  }

}

module.exports = new User();