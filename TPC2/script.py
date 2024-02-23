import os
import json

preHTML_HomePage = """
<!DOCTYPE html>
<html lang="pt-PT">

    <head>
        <title>Cidades de Portugal</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" >
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>

    <body>

        <div class="w3-card-4">

            <header class="w3-container w3-teal">
                <h3>Cidades de Portugal</h3>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4 w3-hover-shadow">
"""

posHTML_HomePage = """
                </ul>
            </div>

            <footer class="w3-container w3-teal">
                <h5>TPC2::EngWeb2024::A97569</h5>
            </footer>

        </div>

    </body>

</html>
"""

preHTMLCidades = """
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>{cityName}</title>
        <meta charset="UTF-8">
        <meta nome="viewport" content="width=device-width, initial-scale=1" >
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h3>{cityName}</h3>
            </header>
            <div class="w3-container">
"""

posHTMLCidades = """
            </div>
            <button class="w3-button w3-round-large">
                <a href="/">Voltar à página principal</a>
            </button>
            <footer class="w3-container w3-teal">
                <h5>TPC2::EngWeb2024::A97569</h5>
            </footer>
        </div>
    </body>
</html>
"""

os.mkdir("cities")

homePageHTML = ""

with open("mapa-virtual.json", encoding='utf-8') as f:
    dados = json.load(f)
    listaCidades = sorted(dados['cidades'], key=lambda x: x['nome'])
    for cidade in listaCidades:
        homePageHTML += f"<li><a href='./{cidade['id']}'>{cidade['nome']}</a></li>"

fullHomePageHTML = preHTML_HomePage + homePageHTML + posHTML_HomePage

with open("./cities/main.html",'w',encoding='utf-8') as file:
    file.write(fullHomePageHTML)
file.close()

#########################################################################################################
#########################################################################################################
#########################################################################################################
#########################################################################################################
#########################################################################################################

def ligacoesCidade(cidade):
    ligacoes = []
    for ligacao in infoCidades['ligacoes']:
        if ligacao['origem'] == cidade['id']:
            ligacoes.append(ligacao)
    return ligacoes

def getDestinoName(id):
    nome = ""
    for i in infoCidades['cidades']:
        if i['id'] == id:
            nome = i['nome']
            break
    return nome

def pageContent(cidade):
    html = ""
    html += f"<p><h3>População: </h3>{cidade['população']}</p>"
    html += f"<p><h3>Descrição: </h3>{cidade['descrição']}</p>"
    html += f"<p><h3>Distrito: </h3>{cidade['distrito']}</p>"
    
    ligacoes = ligacoesCidade(cidade)
    
    if ligacoes != []:
        html += "<h3>Ligações</h3>"
        html += "<ul>"
        for lig in ligacoes:
            nome_destino = getDestinoName(lig['destino'])
            html += f"<li><a href='{lig['destino']}'>{nome_destino}</a></li>"
        html += "</ul>"
    else:
        html += "<h3>Ligações</h3>"
        html += "Não existem ligações"
    return html

with open('mapa-virtual.json', encoding='utf-8') as jFile:
    infoCidades = json.load(jFile)
    cidades = sorted(infoCidades['cidades'], key=lambda x: x['nome'])
    for cidade in cidades:
        cityName = cidade['nome']
        html = pageContent(cidade)
        fullCityHTML = preHTMLCidades.format(cityName = cityName) + html + posHTMLCidades
        jFile = open("./cities/" + cidade['id'] + ".html", "w", encoding='utf-8')
        jFile.write(fullCityHTML)
        jFile.close()