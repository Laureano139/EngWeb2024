import json
import requests

extraDatasetsPaths = [
    "datasets/dataset-extra1.json",
    "datasets/dataset-extra2.json",
    "datasets/dataset-extra3.json"
]

api = "http://localhost:3000/pessoas"

for json_file_path in extraDatasetsPaths:
    with open(json_file_path, "r") as f:
        json_data = json.load(f)

        for data in json_data:            
            response = requests.post(api, json=data, headers={"Content-Type": "application/json"})
            
            if response.status_code == 200:
                print("Dados enviados com sucesso!\n")
            else:
                print("Erro! Código: ", response.status_code)