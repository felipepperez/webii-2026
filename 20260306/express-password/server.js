const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const app = express();
const PORT = 3000;
const viewsDir = path.join(__dirname, "views");

const LOGIN = "admin";
const SENHA = "12345";

const sessoes = new Map();

function gerarToken() {
    return crypto.randomBytes(24).toString("hex");
}

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const html = fs.readFileSync(path.join(viewsDir, "index.html"), "utf-8");
    res.send(html);
});

app.get("/login", (req, res) => {
    let html = fs.readFileSync(path.join(viewsDir, "login.html"), "utf-8");
    html = html.replaceAll("{{erro}}", "");
    res.send(html);
});


app.post("/login", (req, res) => {
    const { usuario, senha } = req.body;
    if (usuario === LOGIN && senha === SENHA) {
        const token = gerarToken();
        sessoes.set(token, { usuario })
        return res.redirect(`/secreto?token=${token}`);
    }
    let html = fs.readFileSync(path.join(viewsDir, "login.html"), "utf-8");
    html = html.replaceAll("{{erro}}", "<p class=\"erro\">Usuário ou senha incorretos.</p>");
    res.send(html);
});

app.get("/secreto", (req, res) => {
    const token = req.query.token;
    const sessao = token ? sessoes.get(token) : null;
    if (!sessao) {
        return res.redirect("/login");
    }
    let html = fs.readFileSync(path.join(viewsDir, "secreto.html"), "utf-8");
    html = html.replaceAll("{{usuario}}", sessao.usuario).replaceAll("{{token}}", token);
    res.send(html);
});

app.get("/sair", (req, res) => {
    const token = req.query.token;
    if (token) sessoes.delete(token);
    res.redirect("/login");
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
