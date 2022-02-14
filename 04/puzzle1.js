const fs = require("fs");

const puzzleData = fs
	.readFileSync("C:\\Users\\earth\\Documents\\advent-of-code\\04\\given.txt")
	.toString()
	.replaceAll("\r", "");

/*
    Right, lemme explain this clusterfuck
    What I'm basically doing is making a three-dimensional array
    that represents a stack of bingo cards.

    Here are the steps I take in order:
    1. Split the string across double-linebreaks, putting each
    board into an array object, including the top line of bingo calls.

    2. Split each element of the array by single-linebreaks, dividing
    each line of the bingo card into it's own array.

    3. Split each line of a card into an array of numbers split by
    spaces

    4. Filter out blank spaces in the array to accomodate double spaces

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
let winningCard;
let winningIndex;
let winningCardParallel;
for (i = 0; i < bingoCall.length; i++) {
	if (!winningCard) {
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
			if (bingoCheck(cardIndex)) {
				winningIndex = cardIndex;
				winningCard = card;
				winningCardParallel = parallel[cardIndex];

				console.log(`Winning card is at index ${winningIndex}!`);
				console.log(winningCard);
				console.log(winningCardParallel);
			}
		});
	}
}

function bingoCheck(index) {
	let currentCard = cards[index];
	let cardParallel = parallel[index];
	// All checks are true until proven false
	let rowCheck = true;
	let columnCheck = true;
	// Check rows
	for (rowIndex = 0; rowIndex < currentCard.length; rowIndex++) {
		for (
			columnIndex = 0;
			columnIndex < currentCard[0].length;
			columnIndex++
		) {
			//
			rowCheck = rowCheck && cardParallel[rowIndex][columnIndex];
		}
	}
	// Check Columns
	for (columnIndex = 0; columnIndex < currentCard[0].length; columnIndex++) {
		for (rowIndex = 0; rowIndex < currentCard.length; rowIndex++) {
			//
			columnCheck = columnCheck && cardParallel[rowIndex][columnIndex];
		}
	}
	/*
    I learned that this assignment doesn't do diagonal checks after writing all this.
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

	return rowCheck || columnCheck;
}
