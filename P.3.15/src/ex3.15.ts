//P3.15 - Repita o problema P.3.13 mas comparando para o pior caso e para o caso médio o algoritmo da bolha não otimizado com o algoritmo merge sort. 
// Para evitar estouro de pilha, faça ordenações repetidas sobre o mesmo array não ordenado (ex. ao invés de ordenar um array de 100.000 elementos, 
// ordene um array de 1000 elementos 100 vezes). 


// Função que gera um array com números de 0 até size-1
// Se reverse for true, retorna o array em ordem decrescente (pior caso)
// Caso contrário, embaralha os elementos (caso médio)

import { writeFileSync } from 'fs';

function generateArray(size: number, reverse: boolean = false): number[] {
    const arr = Array.from({ length: size }, (_, i) => i); // Cria array: [0, 1, 2, ..., size-1]
    return reverse ? arr.reverse() : shuffle([...arr]);     // Inverte ou embaralha (caso médio)
}

// Embaralha os elementos do array usando o algoritmo de Fisher-Yates
function shuffle(arr: number[]): number[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Índice aleatório entre 0 e i
        [arr[i], arr[j]] = [arr[j], arr[i]];            // Troca os elementos
    }
    return arr; // Retorna o array embaralhado
}

// Algoritmo de ordenação Bubble Sort (não otimizado)
function bubbleSort(arr: number[]): number[] {
    const a = [...arr];       // Faz uma cópia do array original para não alterar o original
    const n = a.length;       // Guarda o tamanho do array
    for (let i = 0; i < n - 1; i++) {         // Laço externo
        for (let j = 0; j < n - i - 1; j++) { // Laço interno percorre até o elemento não ordenado
            if (a[j] > a[j + 1]) {            // Se estiver fora de ordem
                [a[j], a[j + 1]] = [a[j + 1], a[j]]; // Troca os elementos
            }
        }
    }
    return a; // Retorna o array ordenado
}

// Algoritmo Merge Sort (ordenador eficiente por divisão e conquista)
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr; // Caso base da recursão: array de 1 elemento já está ordenado

    const mid = Math.floor(arr.length / 2);      // Calcula o meio do array
    const left = mergeSort(arr.slice(0, mid));   // Ordena recursivamente a metade esquerda
    const right = mergeSort(arr.slice(mid));     // Ordena recursivamente a metade direita

    return merge(left, right); // Junta as duas metades ordenadas
}

// Junta dois arrays ordenados em um só
function merge(left: number[], right: number[]): number[] {
    const result: number[] = []; // Array final ordenado
    let i = 0, j = 0;            // Índices para percorrer left e right

    // Enquanto ambos tiverem elementos, compara e adiciona o menor
    while (i < left.length && j < right.length) {
        result.push(left[i] < right[j] ? left[i++] : right[j++]); // Adiciona o menor entre os dois
    }

    // Concatena os elementos restantes (se houver)
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Mede o tempo de execução de uma função em milissegundos
function measureTime(fn: () => void): number {
    const start = process.hrtime.bigint(); // Marca o tempo inicial com alta precisão (nanosegundos)
    fn();                                  // Executa a função fornecida
    const end = process.hrtime.bigint();   // Marca o tempo final
    return Number(end - start) / 1e6;      // Retorna o tempo total em milissegundos
}


// Execução do problema P.3.15

function runP315() {
    console.log("P.3.15 – Bubble Sort Não Otimizado vs Merge Sort (100x sobre o mesmo array)");

    const iterations = 100;
    const size = 1000;

    let bubbleTotalWorst = 0, mergeTotalWorst = 0;
    let bubbleTotalAverage = 0, mergeTotalAverage = 0;

    const worstCase = generateArray(size, true);
    const averageCase = generateArray(size, false);

    for (let i = 0; i < iterations; i++) {
        const worst = [...worstCase];
        const average = [...averageCase];

        bubbleTotalWorst += measureTime(() => bubbleSort(worst));
        mergeTotalWorst += measureTime(() => mergeSort(worst));
        bubbleTotalAverage += measureTime(() => bubbleSort(average));
        mergeTotalAverage += measureTime(() => mergeSort(average));
    }

    console.log(`\nPior caso (100 execuções):`);
    console.log(`  Bubble Sort: ${bubbleTotalWorst.toFixed(2)} ms`);
    console.log(`  Merge Sort:  ${mergeTotalWorst.toFixed(2)} ms`);

    console.log(`\nCaso médio (100 execuções):`);
    console.log(`  Bubble Sort: ${bubbleTotalAverage.toFixed(2)} ms`);
    console.log(`  Merge Sort:  ${mergeTotalAverage.toFixed(2)} ms`);

    // Salvar JSON
    const result = {
        piorCaso: {
            bubble: bubbleTotalWorst / iterations,
            merge: mergeTotalWorst / iterations
        },
        casoMedio: {
            bubble: bubbleTotalAverage / iterations,
            merge: mergeTotalAverage / iterations
        }
    };

    writeFileSync('resultado.json', JSON.stringify(result, null, 2));
    console.log('\nResultados médios salvos em resultado.json');
}

runP315();