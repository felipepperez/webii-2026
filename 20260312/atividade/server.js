const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

function calssificarIMC(imc) {
    if (imc < 18.5) return { classificacao: "Abaixo do peso", grau: "" };
    if (imc < 25) return { classificacao: "Peso normal", grau: "" };
    if (imc < 30) return { classificacao: "Sobrepeso", grau: "" };
    if (imc < 35) return { classificacao: "Obesidade", grau: "Grau I" };
    if (imc < 40) return { classificacao: "Obesidade", grau: "Grau II" };
    return { classificacao: "Obesidade", grau: "Grau III" };
}

app.get("/", (req, res) => {
    res.render("form");
})

app.post('/imc', (req, res) => {
    const peso = parseFloat(req.body.peso?.replace(",", ".")) || 0;
    const altura = parseFloat(req.body.altura?.replace(",", ".")) || 0;

    if (altura <= 0 || peso <= 0) {
        return res.render("resultado", {
            erro: "Peso e altura devem ser maiores que zero.",
            imc: null,
            classificacao: null,
            grau: null,
            peso,
            altura
        });
    }
    const imc = peso / (altura * altura);
    const { classificacao, grau } = calssificarIMC(imc);
    res.render("resultado", {
        erro: null,
        imc: imc.toFixed(2),
        classificacao,
        grau,
        altura,
        peso,
        altura
    });
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})