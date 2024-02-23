const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    const q = url.parse(req.url, true).pathname.slice(1) // Tirar a barra '/'

    if (q === '') {
        fs.readFile('cities/main.html', (err, data) => {
            if (err) {
                handleError(res);
            } else {
                respondWithData(res, 'text/html; charset=utf-8', data)
            }
        })
    } else {
        fs.readFile('mapa-virtual.json', (err, jsonData) => {
            if (err) {
                handleError(res)
            } else {
                const ids = JSON.parse(jsonData).cidades.map(cidade => cidade.id)
                if (ids.includes(q)) {
                    fs.readFile(`cities/${q}.html`, (err, data) => {
                        if (err) {
                            handleError(res)
                        } else {
                            respondWithData(res, 'text/html; charset=utf-8', data)
                        }
                    });
                } else {
                    handleError(res)
                }
            }
        });
    }
}).listen(7777);

function respondWithData(res, contentType, data) {
    res.writeHead(200, {'Content-Type': contentType})
    res.write(data)
    res.end()
}

function handleError(res) {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.write('404 Not Found')
    res.end()
}