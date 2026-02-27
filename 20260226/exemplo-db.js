const { JsonDB, Config } = require('node-json-db');

async function main() {
    const db = new JsonDB(new Config("dados", true, true, "/"));

    await db.push("/usuario", { name: "João", idade: 25 });
    console.log("Salvo: /usuario");

    await db.push("/usuarios/lista[]", { id: 1, nome: "Maria" });
    await db.push("/usuarios/lista[]", { id: 2, nome: "Pedro" });
    console.log("Salvo: /usuarios/lista (2 itens)");

    const usuario = await db.getData("/usuario");
    console.log("Lido /usuario:", usuario);

    const lista = await db.getData("/usuarios/lista");
    console.log("Lido /usuarios/lista:", lista);

    const dadosCompletos = await db.getData("/");
    console.log("Raiz do banco", JSON.stringify(dadosCompletos, null, 2));
}

main().catch((err) => console.error(err));