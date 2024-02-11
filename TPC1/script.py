
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

for ficheiro in os.listdir(ruas_dir):
    
    filepath = os.path.join(ruas_dir, ficheiro)
    
    tree = ET.parse(filepath)
    root = tree.getroot()

    meta = root.find('./meta')
    nome = meta.find('./nome')
    numero = meta.find('./número')
    
    corpo = root.find('./corpo')
    
    figs = []
    figs_atuais = []
    
    for fig in root.findall('./corpo/figura'):
        imagem_path = fig.find('./imagem').attrib.get('path')
        legenda = fig.find('./legenda').text
        figs.append((imagem_path, legenda))

    paragrafo = corpo.find('./para')
    lugar = corpo.find('./lugar')
    entidade = corpo.find('./entidade')
    data = corpo.find('./data')
    
    # \*
    
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
    
    for imagem_path, legenda in figs:
        partes = imagem_path.split("../imagem/")
        imgFile = partes[1]
        templateCidade += f"<figure><br><img src='../MapaRuas-materialBase/imagem/{imgFile}'><br><figcaption>{legenda}</figcaption></figure>"
    
    templateCidade += "</body>"
    ruaFile.write(templateCidade)
    ruaFile.close()
    
    # \*
    
    # lista_casas = corpo.find('./lista-casas')
    # casa = lista_casas.find('./casa')
    # numCasa = casa.find('./número')
    # enfiteuta = casa.find('./enfiteuta')
    # foro = casa.find('./foro')
    # desc = casa.find('./desc')
    # paragrafoCasa = desc.find('./para')
    # lugarCasa = desc.find('./lugar')
    # entidadeCasa = desc.find('./entidade')
    # dataCasa = desc.find('./data')
        
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