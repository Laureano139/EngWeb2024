
import os
import re
import xml.etree.ElementTree as ET

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

lista_ruas = os.listdir(ruas_dir)

# for rua in lista_ruas:
#     name = rua.split('-')
#     ruaName = name[-1].split(".")[0]
#     lista += [ruaName]

# for i in lista:
#     res_list = [s for s in re.split(r"([A-Z][^A-Z]*|[.])", i) if s]
#     listaCorreta.append(" ".join(res_list))

for ficheiro in os.listdir(ruas_dir):
    
    filepath = os.path.join(ruas_dir, ficheiro)
    
    tree = ET.parse(filepath)
    root = tree.getroot()

    meta = root.find('./meta')
    nome = meta.find('./nome')
    numero = meta.find('./número')
    
    lista_ruas.append(nome.text)
    
    ruaFile = open(f'html/{nome.text}.html', 'w', encoding="utf-8")
    
    html += "<ul>"
    html += f'<li><a href="html/{nome.text}.html">{nome.text}</a></li>'
    html += "</ul>"
    with open('mapa.html', 'w', encoding="utf-8") as f:
        f.write(html)
    
    templateCidade = template
    templateCidade += f"<h1>{nome.text}</h1>"
    templateCidade += f"<h3>Número: {numero.text}</h3>"
    templateCidade += "</body>"
    ruaFile.write(templateCidade)
    ruaFile.close()
        
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