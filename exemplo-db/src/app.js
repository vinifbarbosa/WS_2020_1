const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoSanatize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");

require("./db/config");

const app = express();

app.use(cors());
app.use(logger("dev"));

/**
 * Define que os dados recebidos no 
 * corpo da requisição devem estar
 * no formato JSON
 */
app.use(bodyParser.json());

/**
 * Protege os acesso aos banco de dados
 * contra injeções de consultas maliciosas
 */
app.use(mongoSanatize());

/**
 * Para teste inicial
 */

 app.get("/",(req,res) => res.send("Oi!"));

 module.exports = app;