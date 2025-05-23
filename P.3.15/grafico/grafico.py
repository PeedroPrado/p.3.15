import matplotlib.pyplot as plt

# Dados de desempenho
algoritmos = ['Merge Sort', 'Bubble Sort']
pior_caso = [47.86, 142.37]
caso_medio = [55.69, 131.06]

# Criação do gráfico de linhas
plt.figure(figsize=(8, 5))

# Linha para o caso médio
plt.plot(algoritmos, caso_medio, marker='o', linestyle='-', color='blue', label='Caso Médio')

# Linha para o pior caso
plt.plot(algoritmos, pior_caso, marker='o', linestyle='-', color='red', label='Pior Caso')


# Adicionando detalhes ao gráfico
plt.title('P.3.15 – Tempo de Execução (100x - Tamanho 1000)')
plt.xlabel('Algoritmos')
plt.ylabel('Tempo Total (ms)')
plt.legend()
plt.grid(True)
plt.tight_layout()

# Exibe o gráfico
plt.show()
