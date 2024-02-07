
import json
import os
import re

os.mkdir("html")

html = """
<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <title>TPC1</title>
    <meta charset="utf-8">
</head>
<body>
"""

template = """
<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <title>TPC1</title>
    <meta charset="utf-8">
</head>
<body>
"""

curr = os.getcwd()

ruas_dir = os.path.join(curr, 'MapaRuas-materialBase/texto')

lista = []

listaCorreta = []

lista_ruas = os.listdir(ruas_dir)

for rua in lista_ruas:
    name = rua.split('-')
    ruaName = name[-1].split(".")[0]
    lista += [ruaName]

for i in lista:
    res_list = [s for s in re.split("([A-Z][^A-Z]*)", i) if s]
    listaCorreta.append(" ".join(res_list))
    
    

    
    

    
html += "<ul>"

for elem in sorted(listaCorreta):
    html += f'<li><a href="html/{elem}.html">{elem}</a></li>'
    
html += "</ul>"

with open('mapa.html', 'w', encoding="utf-8") as f:
    f.write(html)


#file_path = ruas_dir + '/MRB-01-RuaDoCampo.xml'

#file = open(file_path, "r", encoding="utf-8").read()

# load = json.loads(file)
    
# listaDeCidades = []
# for i in listaCorreta:
#     listaDeCidades.append(i)
#     ficheiroCidade = open(f"html/{i}.html", "w", encoding="utf-8")
#     templateCidade = template
#     templateCidade += f"<h1>{i}</h1>"
#     templateCidade += f"<h2>{i['distrito']}</h2>"
#     templateCidade += f"<b>População: </b>{i['população']}"
#     templateCidade += "<br>"
#     templateCidade += f"<b>Descrição: </b>{i['descrição']}"
#     templateCidade += '<h6><a href="../mapa.html">Voltar</a></h6>'
#     templateCidade += "</body>"
    
#     ficheiroCidade.write(templateCidade)
#     ficheiroCidade.close()