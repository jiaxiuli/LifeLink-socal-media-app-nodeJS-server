const Base = require('./base');
const knex = require('../models/knex');

class Catagory extends Base {
  constructor(props = 'catagory'){
    super(props);
  }

}

module.exports = new Catagory();