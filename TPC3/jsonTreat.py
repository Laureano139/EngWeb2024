import json

dataset = 'filmes.json'

jsonCorrigido = 'filmes2.json'

filmes = []

with open(dataset, 'r', encoding='utf-8') as file:
    for linha in file.readlines():

        filme = json.loads(linha)

        filmes.append(filme)

dataFormat = {'filmes': filmes}

with open(jsonCorrigido, 'w', encoding='utf-8') as jsonOutput:
    json.dump(dataFormat, jsonOutput, indent=2)