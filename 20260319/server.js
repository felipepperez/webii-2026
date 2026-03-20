const express = require("express");

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Exemplos de rota Express");
})

app.get('/saudacao/:nome/:turno', (req, res) => {
    const { nome, turno } = req.params;
    res.json({ rota: '/saudacao/:nome/:turno', nome, turno });
})

app.get('/busca', (req, res) => {
    const { termo = "", pagina = 1 } = req.query;
    res.json({ rota: '/busca?termo=&pagina=', termo, pagina });
})

app.get(/^\/status\/(\d+)$/, (req, res) => {
    const codigo = Number(req.params[0]);
    if (!Number.isInteger(codigo) || codigo < 100 || codigo > 599) {
        return res.status(400).json({ erro: "Código de Status inválido" });
    }
    res.status(codigo).send(`Status definido para ${codigo}`);
})

app.get("/arquivo/:nome.:ext", (req, res) => {
    const { nome, ext } = req.params;
    res.json({ rota: '/arquivo/:nome.:ext', nome, ext });
})

app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada", rota: req.originalUrl });
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
