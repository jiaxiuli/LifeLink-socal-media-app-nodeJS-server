const Base = require('./base');
const knex = require('../models/knex');

class Article extends Base {
  // 定义参数默认值为 user 表
  constructor(props = 'article'){
    super(props);
  }

  uploadArticle (article) {
    return knex(this.table).insert(article); 
  }

  getArticleById (articleId) {
    return knex(this.table).where('id', '=', articleId).select();
  }

}

module.exports = new Article();