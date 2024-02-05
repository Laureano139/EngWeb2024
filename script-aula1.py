
import os

# Criar pastas

for i in range(1,9):
    folder = f"TPC{i}"
    os.makedirs(folder)
    
os.mkdir("Teste")

os.mkdir("Projeto")    