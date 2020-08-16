const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//Analisar conteúdo das requisições - aplicação/json
app.use(bodyParser.json());

//Analisar conteúdo das requisições - aplicação/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

const db = require("./app/models");
db.sequelize.sync();

/**
 * Se em algum momento do desenvolvimento for necessário
 * eliminar as tabelas existentes e sincronizar novamente
 * o banco de dados. Usar o código abaixo:  
 */
/**
 * db.sequelize.sync({ force: true }).then(() => {
 * console.log("Apague e sincronize novamente o db.")})
 */

//Rota simples
app.get("/", (req, res) => {
    res.json({ message: "Bem-vindo(a) a aplicação!" });
});

//incluindo as rotas
require("./app/routes/tutorial.routes")(app);

//porta para escutar as requisições
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});