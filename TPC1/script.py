
import os
import re
import xml.etree.ElementTree as ET

os.mkdir("html")

html = """
<!DOCTYPE html>
<html lang="pt-PT">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<head>
    <title>TPC1</title>
    <meta charset="utf-8">
    <div class="w3-container w3-teal w3-center">
        <h1>Ruas de Braga</h1>
    </div>
</head>
<body>
"""

template = """
<!DOCTYPE html>
<html lang="pt-PT">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
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
    
    lista_ruas.append(nome.text)
    
    ruaFile = open(f'html/{nome.text}.html', 'w', encoding="utf-8")
    
    html += "<ul class='w3-ul w3-border w3-hoverable'>"
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
        templateCidade += f"""
                        <div class="w3-third">
                            <div class="w3-card">
                                <img src='../MapaRuas-materialBase/imagem/{imgFile}' class="w3-hover-opacity" style="width:100%">
                                <div class="w3-container">
                                    <h5>{legenda}</h5>
                                </div>
                            </div>
                        </div>
        """
        #templateCidade += f"<div class='w3-card-4'><br><img src='../MapaRuas-materialBase/imagem/{imgFile}'><br><div class='w3-container w3-center'><p>{legenda}</p></div></div>"
        
    for para in root.findall('./corpo/para'):
        templateCidade += f'<p>{para.text}'
            
        for elem in para:
            if elem.tag == 'lugar' or elem.tag == 'data' or elem.tag == 'entidade':
               templateCidade += f'<b>{elem.text}</b>{elem.tail}'
        templateCidade += '</p>'
    
    for casa in root.findall('./corpo/lista-casas/casa'):
        if casa.find('número') != None:
            num_casa = casa.find('número').text
            templateCidade += f'Número da casa: {num_casa}<br>'
        else: pass
        if casa.find('enfiteuta') != None:
            enfiteuta = casa.find('enfiteuta')
            templateCidade += f'Enfiteuta: {enfiteuta.text}<br>'
        else: pass
        if casa.find('foro') != None:
            foro = casa.find('foro').text
            templateCidade += f'Foro: {foro}<br>'
        else: pass
        
    for descr in root.findall('./corpo/desc'):
        for para in descr.find('para'):
            templateCidade += f'Descrição: <p>{para.text}'
            for elem in para:
                if elem.tag == 'lugar' or elem.tag == 'data' or elem.tag == 'entidade':
                    templateCidade += f'<b>{elem.text} {elem.tail}</b>'
            templateCidade += '</p>'
    
    templateCidade += "</body>"
    ruaFile.write(templateCidade)
    ruaFile.close()
    f.close()
    
html += """ <footer class="w3-container w3-center w3-teal">
                    <p>TPC1::AfonsoAmorim::A97569::PL3</p>
                </footer>
            """

with open('mapa.html', 'w', encoding="utf-8") as f:
        f.write(html)