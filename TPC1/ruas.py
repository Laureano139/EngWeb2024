import os
import xml.etree.ElementTree as ET
import re

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
    <ul class='w3-ul w3-border w3-hoverable'>
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

img_atuais = os.path.join(curr, 'MapaRuas-materialBase/atual')

lista_ruas = []
    

for ficheiro in os.listdir(ruas_dir):
        
    filepath = os.path.join(ruas_dir, ficheiro)
    tree = ET.parse(filepath)
    root = tree.getroot()

    meta = root.find('./meta')
    nome = meta.find('./nome').text.strip()
    numero = meta.find('./número').text

    lista_ruas.append(nome)
    
    templateCidade = template
    templateCidade += f"<h1>{nome}</h1>"
    templateCidade += f"<h3>Número: {numero}</h3>"
    
    for atual in os.listdir(img_atuais):
        r_digits = r"\d+"
        match = re.search(r_digits, atual)
        if match and match.group() == numero:
            templateCidade += f"""
            
            <div class="w3-third w3-card">
                <img src='../MapaRuas-materialBase/atual/{atual}' class="w3-hover-opacity" style="width:100%">
                <div class="w3-container">
                    <h5>Vista atual da rua</h5>
                </div>
            </div>
            
            """

    imagens = []
    
    corpo = root.find('./corpo')
    
    for fig in root.findall('./corpo/figura'):
        imagem_path = fig.find('./imagem').attrib.get('path')
        legenda = fig.find('./legenda').text
        partes = imagem_path.split("../imagem/")
        imgFile = partes[1]
        templateCidade += f"""
            <div class="w3-third w3-card">
                <img src='../MapaRuas-materialBase/imagem/{imgFile}' class="w3-hover-opacity" style="width:100%">
                <div class="w3-container">
                    <h5>{legenda}</h5>
                </div>
            </div>
        """
        
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
    with open(f'html/{nome}.html', 'w', encoding="utf-8") as ruaHTML:
        ruaHTML.write(templateCidade)
        
#######################################################################################################################
        
lista_ordenada = sorted(lista_ruas, key=lambda x: x[0])
print(f"{lista_ruas}\n\n{lista_ordenada}")

for rua in lista_ordenada:
    html += f'<li><a href="html/{rua}.html">{rua}</a></li>'

html += """     </ul>
                <footer class="w3-container w3-center w3-teal">
                    <p>TPC1::AfonsoAmorim::A97569::PL3</p>
                </footer>
        """

with open('mapa.html', 'w', encoding="utf-8") as f:
    f.write(html)