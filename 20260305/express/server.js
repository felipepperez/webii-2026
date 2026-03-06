const express = require("express");
const app = express();
const PORT = 3000;

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("<h1>Olá Mundo!</h1><p>Servidor Express Rodando.</p>");
})

app.get("/sobre", (req, res) => {
    res.send("<h1>Sobre</h1><p>Aula 05 - Servidor HTTP com Express.</p>");
})


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
