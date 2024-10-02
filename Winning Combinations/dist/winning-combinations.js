"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinningCombinations = void 0;
function call(lines) {
    const result = [];
    const wild = 0;
    const payingSymbols = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let currentSymbol = null;
    let currentCombination = [];
    for (let i = 0; i < lines.length; i++) {
        const symbol = lines[i];
        // Se estamos começando ou continuando uma sequência válida
        if (symbol === wild || (currentSymbol === null || symbol === currentSymbol || currentSymbol === wild)) {
            currentCombination.push(i);
            if (currentSymbol === null && symbol !== wild) {
                currentSymbol = symbol; // Definimos o símbolo atual como o primeiro que encontramos
            }
        }
        else {
            // Verifica se uma combinação anterior é válida
            if (currentCombination.length >= 3 && currentSymbol !== null && payingSymbols.has(currentSymbol)) {
                result.push([currentSymbol, currentCombination]);
            }
            // Reinicia a contagem
            currentSymbol = symbol !== wild ? symbol : null;
            currentCombination = symbol === wild ? [i] : currentCombination;
        }
    }
    // Verifica a última combinação
    if (currentCombination.length >= 3 && currentSymbol !== null && payingSymbols.has(currentSymbol)) {
        result.push([currentSymbol, currentCombination]);
    }
    return result.length > 0 ? result : [];
}
exports.WinningCombinations = { call };
