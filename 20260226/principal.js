require("colors");

const S = require("string");
const moment = require("moment");

console.log("===string===".cyan);
const texto = " hello world ";
console.log("Original: ", JSON.stringify(texto));
console.log("Trim + capitalize: ", S(texto).trim().capitalize().s);
console.log("Camelize: ", S("texto longo").camelize().s);

console.log("===colors===".cyan);
console.log("Sucesso:".green, "ok".green);
console.log("Aviso:".yellow, "atenção".yellow);
console.log("Erro:".red,"falha".red);

console.log("===moment===".cyan);
console.log("Hoje:",moment().format("DD/MM/YYYY"));
console.log("Hoje:",moment().format("HH:mm:ss"));
console.log("Data completa:",moment().format("dddd, D [de] MMMM [de] YYYY"));
console.log("Daqui a 7 dias:",moment().add(7,"days").format("DD/MM/YYYY"));