//symbols.ts
export type Symbol = number;
export type Payline = [Symbol, number[]];

export function checkPayline(symbols: Symbol[]): Payline | null {
    if (symbols.length > 3) {
        return null;
    }

    for (let i = 0; i < symbols.length - 2; i++) {
        if (
            symbols[i] >= 1 &&
            symbols[i] <= 9 &&
            symbols[i] === symbols[i + 1] &&
            symbols[i] === symbols[i + 2]
        ) {
            return [symbols[i], [i, i + 1, i + 2]];
        }
    }

    return null;
}