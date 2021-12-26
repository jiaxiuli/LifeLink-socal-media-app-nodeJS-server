// 引用用户模版数据
const Article = require('../models/article.js');
const User = require('../models/user.js');

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
    }
}

module.exports = articleController;