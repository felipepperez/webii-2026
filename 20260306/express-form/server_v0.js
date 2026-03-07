const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head><link rel="stylesheet" href="/estilo.css"></head>
            <body>
                <h1>Formulário com express</h1>
                <p><a href="/contato">Link para o formulário</a></p>
            </body>
        </html>
        `);
});

app.get("/contato", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head><link rel="stylesheet" href="/estilo.css"></head>
            <body>
                <h1>Contato</h1>
                <form action="/contato" method="POST">
                    <p><label>Nome: <input type="text" name="nome" required></label></p>
                    <p><label>E-mail: <input type="email" name="email" required></label></p>
                    <p><label>Mensagem: <textarea name="mensagem" rows="4" required></textarea></label></p>
                    <p><button type="submit">Enviar</button></p>
                </form>
                <p><a href="/">Voltar</a></p>
            </body>
        </html>
        `);
});

app.post("/contato", (req, res) => {
    const { nome, email, mensagem } = req.body;
    res.send(`
        <!DOCTYPE html>
        <html>
            <head><link rel="stylesheet" href="/estilo.css"></head>
            <body>
                <h1>Dados Recebidos</h1>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                <p><strong>Mensagem:</strong> ${mensagem}</p>
                <p><a href="/contato">Enviar outra mensagem</a> | <a href="/">Início</a></p>
            </body>
        </html>
        `);
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
