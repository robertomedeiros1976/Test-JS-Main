
type WinningCombinationsResult = [number, number[]];

function call(lines: number[]): WinningCombinationsResult[] {
  const result: WinningCombinationsResult[] = [];
  const wild = 0;
  const payingSymbols = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const noPayngSymbols = new Set([10, 11, 12, 13, 14, 15]);

  let currentSymbol: number | null = null;
  let currentCombination: number[] = [];
  let zeroPositions: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const symbol = lines[i];

    // Se estamos começando ou continuando uma sequência válida
    if (noPayngSymbols.has(symbol) === false) {
      
      if (symbol === wild || (currentSymbol === null || symbol === currentSymbol || currentSymbol === wild)) {
        currentCombination.push(i);
  
        if (currentSymbol === null && symbol !== wild) {
          currentSymbol = symbol; // Definimos o símbolo atual como o primeiro que encontramos
        }
  
        if (symbol === wild) {
          zeroPositions.push(i);
        }
      } else {
        // Verifica se uma combinação anterior é válida
        if (currentCombination.length >= 3 && currentSymbol !== null && payingSymbols.has(currentSymbol)) {
          result.push([currentSymbol, [...currentCombination]]);
        }
        
        // Reinicia a contagem
        currentSymbol = symbol !== wild ? symbol : null;
        currentCombination = symbol === wild ? currentCombination : [i]
      }
    }
  }

  // Verifica a última combinação
  if (currentSymbol !== null && payingSymbols.has(currentSymbol))
  {
    if (result.length > 0) {
      if (currentCombination.length > 0 && zeroPositions.length > 0) {            
        const filtering =  zeroPositions.filter(f => !result[result.length - 1][1].includes(f));    
        const eliminated = filtering.filter(f => !currentCombination.includes(f));    
        result.push([currentSymbol, [...eliminated, ...currentCombination]]);
                
      } else if (currentCombination.length >= 3) {
        result.push([currentSymbol, [...currentCombination]]);
      }
    } 
    
  }

  if (currentSymbol === null && currentCombination.length > 0) {
    result.push([0, [...currentCombination]]);
  } 

  return result.length > 0 ? result : [];
}
export const WinningCombinations = { call };

