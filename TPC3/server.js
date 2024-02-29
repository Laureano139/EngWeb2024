
const http = require('http')
const fs = require('fs')
const axios = require('axios')
const url = require('url')

http.createServer(function (req, res) {
    console.log(req.method + " " + req.url)

    var q = url.parse(req.url, true)

    if(q.pathname == '/filmes'){
        axios.get('http://localhost:3000/filmes?_sort=title')
        .then(dados => {
            //console.log(dados.data)
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<head><link rel='stylesheet' type='text/css' href='./w3.css'></head>")
            res.write("<body>")
            res.write("<div class='w3-container w3-teal w3-center'>")
            res.write("<h1> Lista de Filmes </h1>")
            res.write("</div>")
            res.write("<ul class='w3-ul w3-hoverable'>")
            for(i in dados.data){
                //console.log(dados.data[i])
                //console.log(dados.data[i].id)
                //console.log(dados.data[i]._id.$oid)
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
        })
    }
    
    else if(q.pathname.match(/\/filmes\/\w+/)){
        let desig = q.pathname.substring(8)
        axios.get('http://localhost:3000/filmes?_id.$oid=' + desig)
        .then(dados => {
            //console.log(dados.data)
            //console.log(dados.data['title'])
            //console.log(dados.data[0]['title']) <-
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<head><link rel='stylesheet' type='text/css' href='/w3.css'><title>"+ dados.data[0]['title'] +"</title></head>")
            res.write("<body>")
            res.write("<div class='w3-padding-16'>")
            res.write("<h2><b> Nome do filme: </b></h2>" + "<h4>" + dados.data[0]['title'] + "</h4>")
            res.write("<h2><b> Ano do filme: </b></h2>" + "<h4>" + dados.data[0]['year'] + "</h4>")
            res.write("<h2><b> Elenco: </b></h2>")
            res.write("<ul class='w3-ul w3-hoverable'>")
            for(ator in dados.data[0]['cast']){
                //console.log(dados.data[0]['cast'][ator])
                res.write("<li><a href='/atores/'>" + dados.data[0]['cast'][ator] + "</a></li>")
            }
            res.write("</ul>")
            res.write("<h2><b> Géneros: </b></h2>")
            res.write("<ul class='w3-ul w3-hoverable'>")
            if(dados.data[0]['genres'].length == 0){
                res.write("<h4> Não existem géneros associados a este filme! </h4>")
            }
            else{
                for(genre in dados.data[0]['genres']){
                    res.write("<li><a href='/géneros/'>" + dados.data[0]['genres'][genre] + "</a></li>")
                }
            }
            res.write("</ul>")

            res.write("<div class='w3-center'><a href='/filmes'><button class='w3-button w3-teal'>Voltar</button></a></div>")

            res.write("</div></body>")

            res.write("<div class='w3-padding-16'><footer class='w3-container w3-teal w3-center'>")
            //console.log("Abri footer\n")
            res.write("<h6> TPC3::EngWeb2024::A97569 </h6>")
            res.write("</footer></div>")
            //console.log("Fechei footer\n")
            res.end()
        }).catch(erro => {
            res.write("Erro!")
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