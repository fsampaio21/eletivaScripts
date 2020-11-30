// Models de artigos (Cria a tabela no banco de dados)

const Sequelize = require("sequelize");
const Category = require("../categories/Category");
const connection = require("../database/database");

const Article = connection.define("articles", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Slug definira uma rota amigável "desenvolvimento-web"

// Relações de chave primária e estrangeira das tabelas do BD
Category.hasMany(Article);
Article.belongsTo(Category);

Article.sync({force: true});
// Category.sync({force:true});

module.exports = Article;