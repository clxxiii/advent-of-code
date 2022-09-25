import { readFileSync } from "fs";

const puzzleData = readFileSync("./data/raw/04.txt")
	.toString()
	.replaceAll("\r", "");

/*
    Right, lemme explain this clusterfuck
    What I'm basically doing is making a three-dimensional array
    that represents a stack of bingo cards.

    Here are the steps I take in order:
    1. Split the string across double-line breaks, putting each
    board into an array object, including the top line of bingo calls.

    2. Split each element of the array by single-line breaks, dividing
    each line of the bingo card into it's own array.

    3. Split each line of a card into an array of numbers split by
    spaces

    4. Filter out blank spaces in the array to accommodate double spaces

    5. Remove the first line and assign it to the bingoCall variable
*/

let cards = puzzleData.split("\n\n").map((x) => {
	return x.split("\n").map((x) => {
		return x.split(" ").filter((x) => {
			return !(x == "");
		});
	});
});

let bingoCall = cards.splice(0, 1)[0][0][0].split(",");

// Create a parallel array of boolean variables:
let parallel = [];
for (cardCount = 0; cardCount < cards.length; cardCount++) {
	let card = [];
	for (rowCount = 0; rowCount < cards[0].length; rowCount++) {
		let row = [];
		for (cellCount = 0; cellCount < cards[0][0].length; cellCount++) {
			row.push(false);
		}
		card.push(row);
	}
	parallel.push(card);
}

// Play Bingo!
let lastCall;
let finalCard = [];
let finalParallel = [];
for (i = 0; i < bingoCall.length; i++) {
	if (cards.length > 0) {
		let call = bingoCall[i];
		console.log(`Current Call: ${call}`);
		cards.forEach((card, cardIndex) => {
			card.forEach((row, rowIndex) => {
				row.forEach((cell, cellIndex) => {
					// Mark a cell as true in the parallel array if the number equals the called number
					if (cell == call) {
						parallel[cardIndex][rowIndex][cellIndex] = true;
					}
				});
			});
		});
		cards.forEach((card, cardIndex) => {
			if (bingoCheck(cardIndex)) {
				console.log(`Winning card at index ${cardIndex}!`);
				console.log(cards[cardIndex]);
				console.log(parallel[cardIndex]);
				if (cards.length == 1) {
					console.log(`Last Call: ${call}`);
					lastCall = call;
					finalCard = cards[0];
					finalParallel = parallel[0];
				}

				cards.splice(cardIndex, 1);
				parallel.splice(cardIndex, 1);
				console.log(`${cards.length} cards remaining`);
			}
		});
	} else {
		continue;
	}
}
/*
 * Post-bingo operations to calculate desired number
 */
console.log(`Remaining card:`);
console.log(finalCard);
console.log(finalParallel);
let remainingCellsOnCard = [];
let remainingSum = 0;
finalParallel.forEach((row, rowIndex) => {
	row.forEach((cell, cellIndex) => {
		if (!cell) {
			remainingCellsOnCard.push(finalCard[rowIndex][cellIndex]);
			remainingSum += parseInt(finalCard[rowIndex][cellIndex]);
		}
	});
});
console.log(
	`Remaining Numbers: ${remainingCellsOnCard}\nRemaining Number Sum: ${remainingSum}\nNumber to submit: ${remainingSum} * ${lastCall} = ${
		remainingSum * lastCall
	}`
);

function bingoCheck(index) {
	let currentCard = cards[index];
	let cardParallel = parallel[index];
	let bingo = false;
	// Check rows
	for (rowIndex = 0; rowIndex < currentCard.length; rowIndex++) {
		// True until proven false
		let rowCheck = true;
		for (
			columnIndex = 0;
			columnIndex < currentCard[0].length;
			columnIndex++
		) {
			//
			rowCheck = rowCheck && cardParallel[rowIndex][columnIndex];
		}
		// boolean bingo cannot be made false after becoming true
		bingo = bingo || rowCheck;
	}
	// Check Columns
	for (columnIndex = 0; columnIndex < currentCard[0].length; columnIndex++) {
		let columnCheck = true;
		for (rowIndex = 0; rowIndex < currentCard.length; rowIndex++) {
			//
			columnCheck = columnCheck && cardParallel[rowIndex][columnIndex];
		}
		// boolean bingo cannot be made false after becoming true
		bingo = bingo || columnCheck;
	}
	/*
    I learned that this puzzle doesn't do diagonal checks after writing all this.

	// Check first diagonal
	for (rowIndex = 0; rowIndex < currentCard[0].length; rowIndex++) {
		let columnIndex = rowIndex;
		diagonalCheck = diagonalCheck && cardParallel[rowIndex][columnIndex];
	}
	// Check Inverse Diagonal
	for (rowIndex = currentCard[0].length - 1; rowIndex >= 0; rowIndex--) {
		let columnIndex = currentCard[0].length - 1 - rowIndex;

		diagonalCheckInverse =
			diagonalCheckInverse && cardParallel[rowIndex][columnIndex];
	}
    */

	return bingo;
}
