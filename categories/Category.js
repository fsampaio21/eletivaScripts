// Models de artigos (Cria a tabela no banco de dados)

const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define("categories", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Slug definira uma rota amigável "desenvolvimento-web"

// Category.sync({force: true});

module.exports = Category;