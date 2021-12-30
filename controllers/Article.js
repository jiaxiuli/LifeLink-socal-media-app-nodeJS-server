// 引用用户模版数据
const Article = require('../models/article.js');
const User = require('../models/user.js');
const async = require('async');

const articleController = {

    uploadArticle: async function (req, res) {
        try {
            const article = req.body.article;
            const date = new Date();
            const authorId = article.author;
            const authorList = await User.selectUserById(authorId);
            const author = authorList[0];
            article.create_time = date.toLocaleString();
            article.last_modifi_time = date.toLocaleString();
            // 获取当前时间戳
            article.create_timeStamp = Date.now();
            article.lastMod_timeStamp = article.create_timeStamp;
            const result = await Article.uploadArticle(article);
            if (result.length && result[0]) {
                if (!author.articles) {
                    const userArticleStr = JSON.stringify([result[0]]);
                    await User.updateUserInfo(authorId, { articles: userArticleStr });
                } else {
                    const userArticleList = JSON.parse(author.articles);
                    if (userArticleList.indexOf(result[0]) === -1) {
                        userArticleList.push(result[0]);
                        const userArticleStr = JSON.stringify(userArticleList);
                        await User.updateUserInfo(authorId, { articles: userArticleStr });
                    } else {
                        res.send({
                            code: 0,
                            message: "操作失败 文章已存在",
                            data: {}
                        });
                    }
                }
                res.send({
                    code: 200,
                    message: "操作成功",
                    data: {
                        articleId: result[0],
                    }
                });
            } else {
                res.send({
                    code: 0,
                    message: "储存失败",
                    data: {}
                });
            }
        } catch {
            res.send({
                code: 0,
                message: "操作失败",
                data: {}
            });
        }
    },

    getArticlesFromUserList: async function (req, res) {
        try {
            const userList = JSON.parse(req.body.userList);
            if (userList.length) {
                async.map(userList, async (userId) => {
                    const users = await User.selectUserById(userId);
                    const user = users[0];
                    const articleIdList = JSON.parse(user.articles);
                    return articleIdList;
                }, (err, articleIdList) => {
                    let flatArticleIdList = [];
                    articleIdList.forEach((arr) => {
                        flatArticleIdList = flatArticleIdList.concat(arr);
                    });
                    async.map(flatArticleIdList, async (articleId) => {
                        const articleList = await Article.getArticleById(articleId);
                        const article = articleList[0];
                        return article;
                    }, (err, result) => {
                        if (result) {
                            if (result.length) {
                                result = result.map((item) => {
                                    if (item)
                                        item.lastMod_timeStamp = parseInt(item.lastMod_timeStamp);
                                    return item;
                                });
                                // 按照时间戳排序
                                result.sort((a, b) => a.lastMod_timeStamp - b.lastMod_timeStamp);
                            }
                            res.send({
                                code: 200,
                                message: "操作成功",
                                data: result
                            });
                        } else {
                            res.send({
                                code: 0,
                                message: "操作失败",
                                data: err
                            });
                        }
                    })
                });
            } else {
                res.send({
                    code: 0,
                    message: "操作失败",
                    data: '用户列表无数据'
                });
            }
        }catch(err) {
            res.send({
                code: 0,
                message: "操作失败",
                data: err
            });
        }
    }
}

module.exports = articleController;