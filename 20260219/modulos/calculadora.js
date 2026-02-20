function somar(a, b) {
    return a + b;
}

function subtrair(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b == 0) {
        throw new Error("Não é possivel dividir por zero");
    }
    return a / b;
}

const pi = 3.14;

module.exports = {
    pi,
    somar,
    subtrair,
    multiplicar,
    dividir
}