// Importa as dependências a serem utilizadas no projeto
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");

const app = express();

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/articles");
const Category = require("./categories/category");

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

// Chama a página inicial do projeto (criação da rota principal)
app.get("/", (req, res) => {
    res.render("index");
});

// Define a porta do servidor local onde a aplicação irá ser executada e inicia
app.listen(8080, () => {
    console.log("Rodando...")
});