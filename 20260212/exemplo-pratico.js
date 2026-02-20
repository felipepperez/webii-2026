const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const C = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[032m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function ask(pergunta) {
    return new Promise(resolve => rl.question(pergunta, resolve));
}

function num(val) {
    const n = parseFloat(val?.replace(',', '.'));
    return isNaN(n) ? null : n;
}

async function main() {
    console.log(C.cyan + '\n=== Cálculo de combustível===' + C.reset);
    console.log(C.yellow + 'Preencha os dado abaixo:\n' + C.reset);

    const precoLitro = num(await ask(C.blue + "Preço por litro (R$): " + C.reset));
    if (precoLitro === null || precoLitro < 0) {
        console.log(C.red + 'Valor inválido.' + C.reset);
        rl.close();
        return;
    }

    const litros = num(await ask(C.blue + "Quantidade de litros: " + C.reset));
    if (litros === null || litros < 0) {
        console.log(C.red + 'Valor inválido.' + C.reset);
        rl.close();
        return;
    }

    const desconto = num(await ask(C.blue + "Desconto (R$): " + C.reset));
    const desc = desconto === null || desconto < 0 ? 0 : desconto;

    console.time(C.green + 'Tempo de cálculo' + C.reset);
    const totalBruto = precoLitro * litros;
    const totalFinal = totalBruto - desc;
    console.timeEnd(C.green + 'Tempo de cálculo' + C.reset);

    console.log(C.magenta + C.bright + '\n--- Resultado ---' + C.reset);
    console.log(C.yellow + `Subtotal (${litros}L x R$ ${precoLitro.toFixed(2)}): R$ ${totalBruto.toFixed(2)}` + C.reset);
    if (desc > 0) console.log(C.yellow + `Desconto: -R$ ${desc.toFixed(2)}` + C.reset);
    console.log(C.green + C.bright + `Total a pagar: R$ ${totalFinal.toFixed(2)}` + C.reset);

    rl.close();
}

main();