// Importa as dependências a serem utilizadas no projeto
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");

const app = express();

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

const Article = require("./articles/articles");
const Category = require("./categories/category");
const User = require("./users/User");

const session = require("express-session");
app.use(session({
    secret: "txtqualquer", cookie : {maxAge: 3000000}
}));

app.set('view engine', 'ejs');

// Usado para aceitar dados de formulário e arquivos JSON
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(bodyParser.json());

// Cria conexão com o banco de dados + retorno de conexão realizada com sucesso
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso!')
    }).catch(() => {
        console.log(error);
    });

// Pasta com imagens e css (arquivos estáticos)
app.use(express.static('public'));

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

// Chama a página inicial do projeto (criação da rota principal)

app.get("/", (req,res)=>{
    Article.findAll({
        order : [
            ["id", "DESC"]
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles : articles, categories : categories});
        });
    });
});

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where : {
            slug : slug,

        },
    }).then((article) => {
        if(article !== undefined){
            Category.findAll().then((categories) => {
                res.render("partials/article", {article : article, categories : categories})
            });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        console.log(err)
        res.redirect("/");
    });

})

app.get('/category/:slug', (req, res) => {
    var slug = req.params.slug;

    Category.findOne({
        where : {
            slug : slug
        },
        include : [{model : Article}]
    }).then(category => {
        if(category !== undefined){
            Category.findAll().then(categories => {
                res.render("index", {articles : category.articles, categories : categories})
            });
        } 
        else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });

});

// Define a porta do servidor local onde a aplicação irá ser executada e inicia
app.listen(8080, () => {
    console.log("Rodando...")
});