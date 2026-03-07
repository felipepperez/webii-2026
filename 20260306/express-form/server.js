const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3000;
const viewsDir = path.join(__dirname, "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const html = fs.readFileSync(path.join(viewsDir, "index.html"), "utf-8");
    res.send(html);
});

app.get("/contato", (req, res) => {
    const html = fs.readFileSync(path.join(viewsDir, "contato.html"), "utf-8");
    res.send(html);
});

app.post("/contato", (req, res) => {
    const { nome, email, mensagem } = req.body;
    let html = fs.readFileSync(path.join(viewsDir, "dados.html"), "utf-8");
    html = html.replaceAll("{{nome}}", nome).replaceAll("{{email}}", email).replaceAll("{{mensagem}}", mensagem);
    res.send(html);
})


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
