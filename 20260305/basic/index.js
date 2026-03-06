const http = require('http');
require('colors');
const fs = require('fs');
const PORT = 3000;

function respondServer(req,res){
    console.log('request.method='.yellow, req.method);
    console.log('request.url='.yellow, req.url);
    if (req.url === '/json') {
        res.writeHead(200, { 'content-type': 'application/json' });
        const car = { model: "Argo", brand: "Fiat", year: "2019" };
        res.write(JSON.stringify(car));
        res.end();
        return;
    }

    const dir = __dirname;
    try {
        const file = fs.readFileSync(dir + "/public" + req.url);
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(file);
        res.end();
        return;
    } catch (err) {
        console.log(req.url, "Arquivo não encontrado");
    }
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write("<h1>Hello World</h1>");
    res.end();
}

const server = http.createServer(respondServer);

server.listen(PORT);
console.log(`Servidor escutando em: http://localhost:${PORT}`);