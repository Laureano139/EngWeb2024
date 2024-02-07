
import json
import os
import re
import xml.etree.ElementTree as ET

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

for i in lista_ruas:
    path = os.path.join(ruas_dir, i)
    f = open(path, 'r', encoding="utf-8").read()
    
    jsonFile = open("jsonFile.json", "w", encoding="utf-8")
    