
const http = require('http')
const fs = require('fs')
const axios = require('axios')
const url = require('url')

http.createServer(function (req, res) {
    console.log(req.method + " " + req.url)

    var q = url.parse(req.url, true)

    if(q.pathname == '/'){
        axios.get('http://localhost:3000/filmes?_sort=title')
        .then(dados => {
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<head><link rel='stylesheet' type='text/css' href='./w3.css'></head>")
            res.write("<body>")
            res.write("<div class='w3-container w3-teal w3-center'>")
            res.write("<h1> TPC3 </h1>")
            res.write("</div>")
            res.write("<ul class='w3-ul w3-hoverable'>")
            res.write("<li><a href='/filmes'> Página de filmes </a></li>")
            res.write("<li><a href='/atores'> Página de atores </a></li>")
            res.write("<li><a href='/generos'> Página de géneros </a></li>")
            res.write("</ul>")
            res.write("</body>")
            res.write("<footer class='w3-container w3-teal'>")
            res.write("<h6> TPC3::EngWeb2024::A97569 </h6>")
            res.write("</footer>")
            res.end()
        }).catch(erro => {
            res.write("Erro!")
            res.end()
        })
    }

    else if(q.pathname == '/filmes'){
        axios.get('http://localhost:3000/filmes?_sort=title')
        .then(dados => {
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<head><link rel='stylesheet' type='text/css' href='./w3.css'></head>")
            res.write("<body>")
            res.write("<div class='w3-container w3-teal w3-center'>")
            res.write("<h1> Lista de Filmes </h1>")
            res.write("</div>")
            res.write("<ul class='w3-ul w3-hoverable'>")
            for(i in dados.data){
                res.write("<li>" + "<a href='filmes/" + dados.data[i]._id.$oid + "'>" + dados.data[i].title + "</a></li>")
            }
            res.write("</ul>")
            res.write("</body>")
            res.write("<footer class='w3-container w3-teal'>")
            res.write("<h6> TPC3::EngWeb2024::A97569 </h6>")
            res.write("</footer>")
            res.end()
        }).catch(erro => {
            res.write("Erro!")
            res.end()
        })
    }
    
    else if(q.pathname.match(/\/filmes\/\w+/)){
        let desig = q.pathname.substring(8)
        axios.get('http://localhost:3000/filmes?_id.$oid=' + desig)
        .then(dados => {
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<head><link rel='stylesheet' type='text/css' href='/w3.css'><title>"+ dados.data[0]['title'] +"</title></head>")
            res.write("<body>")
            res.write("<div class='w3-container w3-teal w3-center'><h1> Página do filme </h1></div>")
            res.write("<div class='w3-padding-16'>")
            res.write("<h2><b> Nome do filme: </b></h2>" + "<h4>" + dados.data[0]['title'] + "</h4>")
            res.write("<h2><b> Ano do filme: </b></h2>" + "<h4>" + dados.data[0]['year'] + "</h4>")
            res.write("<h2><b> Elenco: </b></h2>")
            res.write("<ul class='w3-ul w3-hoverable'>")
            for(ator in dados.data[0]['cast']){
                res.write("<li><a href='/atores/" + dados.data[0]['cast'][ator] + "'>" + dados.data[0]['cast'][ator] + "</a></li>")
            }
            res.write("</ul>")
            res.write("<h2><b> Géneros: </b></h2>")
            res.write("<ul class='w3-ul w3-hoverable'>")
            if(dados.data[0]['genres'].length == 0){
                res.write("<h4> Não existem géneros associados a este filme! </h4>")
            }
            else{
                for(genre in dados.data[0]['genres']){
                    res.write("<li><a href='/generos/" + dados.data[0]['genres'][genre] +"'>" + dados.data[0]['genres'][genre] + "</a></li>")
                }
            }
            res.write("</ul>")
            res.write("<div class='w3-center'><a href='/filmes'><button class='w3-button w3-teal'>Voltar</button></a></div>")
            res.write("</div></body>")

            res.write("<div class='w3-padding-16'><footer class='w3-container w3-teal w3-center'>")
            res.write("<h6> TPC3::EngWeb2024::A97569 </h6>")
            res.write("</footer></div>")

            res.end()
        }).catch(erro => {
            res.write("Erro!")
        })
    }

    else if(q.pathname == '/atores'){
        atoresAux = []
        axios.get('http://localhost:3000/filmes')
        .then(dados => {
            atores = dados.data
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<head><link rel='stylesheet' type='text/css' href='/w3.css'><title> Atores </title></head>")
            res.write("<body>")
            res.write("<div class='w3-container w3-teal w3-center'><h1> Atores </h1></div>")
            res.write("<ul class='w3-ul w3-hoverable'>")
            for(i in atores){
                for(n in atores[i].cast){
                    if(!atoresAux.includes(atores[i].cast[n])){
                        atoresAux.push(atores[i].cast[n])
                        res.write("<li><a href='/atores/" + atores[i].cast[n] + "'>" + atores[i].cast[n] + "</a></li>")
                    }
                }
            }
            res.write("</ul>")
            res.write("<div class='w3-center'><a href='/filmes'><button class='w3-button w3-teal'>Voltar</button></a></div>")
            res.write("</body>")
            res.write("<div class='w3-padding-16'><footer class='w3-container w3-teal w3-center'>")
            res.write("<h6> TPC3::EngWeb2024::A97569 </h6>")
            res.write("</footer></div>")
            res.end()
        })
        .catch(error => {
            res.write("Erro!")
            res.end()
        })
    }

    else if(q.pathname.match(/\/atores\/[\w\s(')?]+/)){
        let desig = q.pathname.substring(8)
        var nameFormat = desig.replace(/%20/g, " ")
        axios.get('http://localhost:3000/filmes')
        .then(dados => {
            var filmes = dados.data.filter(filme => filme.cast && filme.cast.includes(nameFormat))
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<head><link rel='stylesheet' type='text/css' href='/w3.css'><title>"+ nameFormat +"</title></head>")
            res.write("<body>")
            res.write("<div class='w3-container w3-teal w3-center'><h1> Página do Ator </h1></div>")
            res.write("<h2><b> Nome: </b></h2>" + "<h4>" + nameFormat + "</h4>")
            res.write("<h2><b> Filmes onde participou: </b></h2>")
            res.write("<ul class='w3-ul w3-hoverable'>")
            filmes.forEach(filme => {
                res.write("<li><a href='/filmes/" + filme._id.$oid + "'>" + filme.title + "</a></li>")
            })
            res.write("</ul>")
            res.write("<div class='w3-center'><a href='/filmes'><button class='w3-button w3-teal'>Voltar</button></a></div>")
            res.write("</body>")
            res.write("<div class='w3-padding-16'><footer class='w3-container w3-teal w3-center'>")
            res.write("<h6> TPC3::EngWeb2024::A97569 </h6>")
            res.write("</footer></div>")
            res.end()
        })
        .catch(error => {
            res.write("Erro!")
            res.end()
        })
    }

    else if(q.pathname == '/generos'){
        generosAux = []
        axios.get('http://localhost:3000/filmes')
        .then(dados => {
            generos = dados.data
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<head><link rel='stylesheet' type='text/css' href='/w3.css'><title> Géneros </title></head>")
            res.write("<body>")
            res.write("<div class='w3-container w3-teal w3-center'><h1> Géneros </h1></div>")
            res.write("<ul class='w3-ul w3-hoverable'>")

            for(i in generos){
                for(n in generos[i].genres){
                    if(!generosAux.includes(generos[i].genres[n])){
                        generosAux.push(generos[i].genres[n])
                        res.write("<li><a href='/generos/" + generos[i].genres[n] + "'>" + generos[i].genres[n] + "</a></li>")
                    }
                }
            }

            res.write("</ul>")
            res.write("<div class='w3-center'><a href='/filmes'><button class='w3-button w3-teal'>Voltar</button></a></div>")
            res.write("</body>")
            res.write("<div class='w3-padding-16'><footer class='w3-container w3-teal w3-center'>")
            res.write("<h6> TPC3::EngWeb2024::A97569 </h6>")
            res.write("</footer></div>")
            res.end()
        })
        .catch(error => {
            res.write("Erro!")
            console.error(error)
            res.end()
        })
    }

    else if(q.pathname.match(/\/generos\/(\w+)/)){
        let gen = q.pathname.substring(9)
        var generoFormat = gen.replace(/%20/g, " ")
        axios.get('http://localhost:3000/filmes')
        .then(dados => {

            var filmesCat = dados.data.filter(filmeCat => filmeCat.genres && filmeCat.genres.includes(generoFormat))

            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})

            res.write("<head><link rel='stylesheet' type='text/css' href='/w3.css'><title>"+ generoFormat +"</title></head>")

            res.write("<body>")
            res.write("<div class='w3-container w3-teal w3-center'> Página da categoria </div>")

            res.write("<h2><b> Categoria: </b></h2>" + "<h4>" + generoFormat + "</h4>")

            res.write("<h2><b> Filmes da categoria: </b></h2>")
            res.write("<ul class='w3-ul w3-hoverable'>")

            filmesCat.forEach(filmeCat => {
                res.write("<li><a href='/filmes/" + filmeCat._id.$oid + "'>" + filmeCat.title + "</a></li>")
            })

            res.write("</ul>")
            res.write("<div class='w3-center'><a href='/filmes'><button class='w3-button w3-teal'>Voltar</button></a></div>")
            res.write("</body>")
            res.write("<div class='w3-padding-16'><footer class='w3-container w3-teal w3-center'>")
            res.write("<h6> TPC3::EngWeb2024::A97569 </h6>")
            res.write("</footer></div>")
            res.end()
        })
        .catch(error => {
            res.write("Erro!")
            console.error(error)
            res.end()
        })
    }
    
    else if(q.pathname == '/w3.css'){
        fs.readFile('w3.css', (erro, dados) => {

            if(!erro){
                res.writeHead(200, {'Content-Type' : 'text/css'})
                res.write(dados)
                res.end()
            } else{
                res.write("Erro!")
                res.end()
            }
        })
    }
    else{
        res.write("Erro!\n")
        res.end()
    }
}).listen(3333)

console.log('Servidor à escuta na porta 3333...\n')