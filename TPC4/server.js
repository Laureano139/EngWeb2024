var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')
var static = require('./static.js')

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var composersServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                if(req.url == '/'){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.end(templates.homePage(d))
                }
                // GET /compositores --------------------------------------------------------------------
                if(req.url == '/compositores'){
                    axios.get("http://localhost:3000/compositores?_sort=nome")
                    .then(resp => {
                        var compositores = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        //res.write(templates.composersListPage(compositores, d))
                        res.end(templates.composersListPage(compositores, d))
                    })
                    .catch(erro => {
                        console.error(erro)
                    })
                }
                
                // GET /compositores/:id --------------------------------------------------------------------
                else if(/\/compositores\/(C)[0-9]+$/i.test(req.url)){
                    var idCompositor = req.url.split('/')[2]
                    axios.get('http://localhost:3000/compositores?id=' + idCompositor)
                    .then(resp => {
                        var compositor = resp.data[0]
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        //res.write(templates.composerPage(compositor, d))
                        res.end(templates.composerPage(compositor, d))
                    })
                    .catch(erro => {
                        console.error(erro)
                    })
                }
                
                // GET /compositores/registo --------------------------------------------------------------------
                else if(req.url == '/compositores/registo'){
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    //res.write(templates.composerFormPage(d))
                    res.end(templates.composerFormPage(d))
                }
               
                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/(C)[0-9]+$/i.test(req.url)){
                    var idCompositor = req.url.split("/")[3]
                    
                    console.log("\n\n"+idCompositor)

                    axios.get("http://localhost:3000/compositores/" + idCompositor)
                    .then(resp => {
                        var compositor = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        //res.write(templates.composerFormEditPage(compositor, d))
                        res.end(templates.composerFormEditPage(compositor, d))
                    })
                    .catch(erro => {
                        console.error(erro)
                    })
                }
               
                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if(/\/compositores\/delete\/(C)[0-9]+$/i.test(req.url)){
                    var idCompositor = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/compositores/' + idCompositor)
                    .then(resp => {
                        res.writeHead(200, {'Location': '/compositores'})
                        axios.get('http://localhost:3000/periodos')
                        .then(resp => {
                            var periodos = resp.data
                            for (let i = 0; i < periodos.length; i++) {
                                var comps = periodos[i].compositores
                                for (let j = 0; j < comps.length; j++) {
                                    if (comps[j].id === idCompositor) {
                                        var composerIndex = periodos[i].compositores.indexOf(comps[j])
                                        periodos[i].compositores.splice(composerIndex, 1)
                                        axios.put('http://localhost:3000/periodos/' + periodos[i].id, periodos[i])
                                    }
                                }
                            }
                        })
                        res.end()
                    })
                    .catch(erro => {
                        console.error(erro)
                    })
                }

                // GET /periodos --------------------------------------------------------------------
                else if(req.url == '/periodos'){
                    axios.get('http://localhost:3000/periodos')
                    .then(resp => {
                        var periodos = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        //res.write(templates.periodsListPage(periodos, d))
                        res.end(templates.periodsListPage(periodos, d))
                    })
                    .catch(erro => {
                        console.error(erro)
                    })
                }

                // GET /periodos/:id --------------------------------------------------------------------
                else if(/\/periodos\/(P1|P2)$/i.test(req.url)){
                    var idPeriodo = req.url.split("/")[2]
                    axios.get('http://localhost:3000/compositores?periodo.id=' + idPeriodo)
                    .then(resp => {
                        var compositores = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        //res.write(templates.compositoresPorPeriodoListPage(compositores, d))
                        res.end(templates.compositoresPorPeriodoListPage(compositores, d))
                    })
                    .catch(erro => {
                        console.error(erro)
                    })
                }

                // GET /periodos/registo --------------------------------------------------------------------
                else if(req.url == '/periodos/registo'){
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    //res.write(templates.periodFormPage(d))
                    res.end(templates.periodFormPage(d))
                }

                // GET /periodos/edit/:id --------------------------------------------------------------------
                else if(/\/periodos\/edit\/(P1|P2)$/i.test(req.url)){
                    var idPeriodo = req.url.split("/")[3]

                    axios.get("http://localhost:3000/periodos/" + idPeriodo)
                    .then(resp => {
                        var periodo = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        //res.write(templates.periodFormEditPage(periodo, d))
                        res.end(templates.periodFormEditPage(periodo, d))
                    })
                    .catch(erro => {
                        console.error(erro)
                    })
                }
                
                // GET ? -> Lancar um erro
                else{
                    //res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    // res.write('<p> Método GET não suportado: ' + req.url)
                    // res.write('</p><p><a href="/">Return</a></p>')
                    //res.end()
                    console.log("Método GET não suportado: " + req.url)
                }
                break
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if(req.url == '/compositores/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post("http://localhost:3000/compositores", result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'})
                                // res.write('<p>Registo inserido: '+ JSON.stringify(resp.data) + '</p>')
                                // res.write('<p><a href="/compositores">Página Compositores</a></p>')
                                res.end('<p>Registo inserido: '+ JSON.stringify(resp.data) + '</p>' + '\n' + '<p><a href="/compositores">Página Compositores</a></p>')
                            })
                            .catch(erro => {
                                console.error(erro)
                            })
                        }
                        else{
                            console.log("Erro no método POST!\n")
                        }
                    })
                }
                
                // POST /compositores/edit/:id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/(C)[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put("http://localhost:3000/compositores/" + result.id, result)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                                // res.write('<p>Registo inserido: '+ JSON.stringify(resp.data) + '</p>')
                                // res.write('<p><a href="/compositores">Página Compositores</a></p>')
                                res.end('<p>Registo inserido: '+ JSON.stringify(resp.data) + '</p>' + '\n' + '<p><a href="/compositores">Página Compositores</a></p>')
                            })
                            .catch(erro => {
                                console.error(erro)
                            })
                        }
                        else{
                            console.log("Erro no método POST: edit\n")
                        }
                    })
                }

                // POST /periodos/registo --------------------------------------------------------------------
                if(req.url == '/periodos/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post("http://localhost:3000/periodos", result)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                                // res.write('<p>Periodo inserido: '+ JSON.stringify(resp.data) + '</p>')
                                // res.write('<p><a href="/periodos">Página Períodos</a></p>')
                                res.end('<p>Período inserido: '+ JSON.stringify(resp.data) + '</p>' + '\n' + '<p><a href="/periodos">Página Períodos</a></p>')
                            })
                            .catch(erro => {
                                console.error(erro)
                            })
                        }
                        else{
                            console.log("Erro no método POST: periodo registo\n")
                        }
                    })
                }

                // POST /periodos/edit/:id --------------------------------------------------------------------
                else if(/\/periodos\/edit\/(P1|P2)$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put("http://localhost:3000/periodos/" + result.id, result)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                                // res.write('<p>Período inserido: '+ JSON.stringify(resp.data) + '</p>')
                                // res.write('<p><a href="/periodos">Página Períodos</a></p>')
                                res.end('<p>Período inserido: '+ JSON.stringify(resp.data) + '</p>' + '\n' + '<p><a href="/periodos">Página Períodos</a></p>')
                            })
                            .catch(erro => {
                                console.error(erro)
                            })
                        }
                        else{
                            console.log("Erro no método POST: periodos edit")
                        }
                    })
                }

                // POST ? -> Lancar um erro
                else{
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write('<p> Método POST não suportado: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }

                break
                
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                res.write('<p> Método não suportado: ' + req.method + '</p>')
                res.end()
                break
        }
    }
})

composersServer.listen(1893, ()=>{
    console.log("Servidor à escuta na porta 1893...")
})