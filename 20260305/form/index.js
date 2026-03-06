const http = require('http');
require('colors');
const fs = require('fs');
const formidable = require('formidable');

const PORT = 3000;

async function respondServer(req, res) {
    console.log(req.method, req.url);
    if (req.url === "/login" && req.method === "POST") {
        try {
            let form = new formidable.Formidable({});
            let fields, files;
            [fields, files] = await form.parse(req);
            console.log(fields);
            if (fields.login[0] === "felipe" && fields.senha[0] === "perez") {
                res.writeHead(200, { 'content-type': 'text/html' });
                res.write(`<h1>Bem vindo ${fields.login[0]} que tem a senha ${fields.senha[0]} </h1>`);
                res.end();
                return;
            }
        } catch (error) {

        }
    }
    const dir = __dirname;
    const file = fs.readFileSync(dir + "/public/form.html");
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(file);
    res.end();
}

const server = http.createServer(respondServer);

server.listen(PORT);
console.log(`Servidor escutando em: http://localhost:${PORT}`);