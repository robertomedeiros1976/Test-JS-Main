type WinningCombinationsResult = [number, number[]][];

function call(lines: number[]): WinningCombinationsResult {
	let paySymbol = isFirstPayingSymbol(lines);
	// Just to store the current index
	let currentIndexSequence: number[] = [];
	// Indexes positions of the zeros in the sequence line
	let zeroPositions: number[] = [];
	let result: WinningCombinationsResult = [];

	// Setting pay sequence to 0 if there are no paying symbols in the entire line
	if (paySymbol === -1) {
		paySymbol = 0;
	}

	lines.forEach((lineNumberValue: number, index: number) => {
		if (lineNumberValue > 9) {
			VerifyNonPayingSymbol();
			return;
		}

		if (lineNumberValue === 0) {
			isSpecialSymbol(index);
			return;
		}

		if (lineNumberValue !== paySymbol) {
			isDifferentSymbol(index, lineNumberValue);
			return;
		}

		currentIndexSequence.push(index);
		zeroPositions = [];
	});

	// Verifying the last sequence
	if (currentIndexSequence.length >= 3) {
		result.push([paySymbol, currentIndexSequence]);
	}

	return result;

	function VerifyNonPayingSymbol() {		
		if (currentIndexSequence.length >= 3) {
			result.push([paySymbol, currentIndexSequence]);
		}
		// Restart variables
		paySymbol = -1;
		currentIndexSequence = [];
		zeroPositions = [];
	}

	function isSpecialSymbol(index: number) {
		currentIndexSequence.push(index);
		zeroPositions.push(index);
	}

	function isDifferentSymbol(
		index: number,
		value: number,
	) {		
		if (paySymbol === -1) {
			paySymbol = value;
			currentIndexSequence = zeroPositions;
			zeroPositions = [];
			currentIndexSequence.push(index);
		} else {		
			if (currentIndexSequence.length >= 3) {
				result.push([paySymbol, currentIndexSequence]);
			}
			paySymbol = value;
			currentIndexSequence = zeroPositions;
			zeroPositions = [];
			currentIndexSequence.push(index);
		}
	}
}

function isFirstPayingSymbol(lines: number[]): number {
	for (const value of lines) {
		if (value <= 9 && value >= 1) {
			return value;
		}
	}
	return -1; 
}

export const WinningCombinations = { call };