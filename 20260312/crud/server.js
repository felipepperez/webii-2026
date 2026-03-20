const express = require("express");
const path = require("path");
const { JsonDB, Config } = require("node-json-db");
const app = express();
const PORT = 3000;
const db = new JsonDB(new Config("dados", true, true, "/"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

async function getLista() {
    try {
        const lista = await db.getData("/itens/lista");
        return Array.isArray(lista) ? lista : [];
    } catch {
        return [];
    }
}

app.get('/', async (req, res) => {
    const lista = await getLista();
    res.render("index", { tela: "listar", itens: lista, item: null });
});

app.get('/novo', (req, res) => {
    res.render("index", { tela: "form", itens: [], item: null });
});

app.post('/novo', async (req, res) => {
    const { nome, descricao } = req.body;
    const item = { id: Date.now(), nome: nome || "", descricao: descricao || "" };
    await db.push("/itens/lista[]", item);
    res.redirect("/");
})

app.get('/editar/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const lista = await getLista();
    const item = lista.find((i) => i.id === id);
    if (!item) return res.redirect('/');
    res.render("index", { tela: "form", itens: [], item });
});

app.post('/editar/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nome, descricao } = req.body;
    try {
        const index = await db.getIndex("/itens/lista", id, "id");
        await db.push(`/itens/lista[${index}]`, {
            id,
            nome: nome || "",
            descricao: descricao || ""
        })
    } catch {
    }
    res.redirect("/");
});

app.get('/excluir/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const index = await db.getIndex("/itens/lista", id, "id");
        await db.delete(`/itens/lista[${index}]`);
    } catch {
    }
    res.redirect('/');
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
