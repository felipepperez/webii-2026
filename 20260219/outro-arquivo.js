const calc = require("./modulos/calculadora");

console.log("=== Uso em outro arquivo ===");

const preco = 29.99;
const quantidade = 3;
const total = calc.multiplicar(preco, quantidade);

console.log(`${quantidade} itens a R$${preco} = R$${total.toFixed(2)}`);
