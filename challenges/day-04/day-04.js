import { readChallengeInput } from "../../utils/utils.js";

const  countOccurrencesOfWord = (matrix, targetWord = "XMAS") => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const wordLength = targetWord.length;
  let xmasAppearances = 0;

  const directions = [
    [0, 1],  // Right
    [1, 0],  // Down
    [0, -1], // Left
    [-1, 0], // Up
    [1, 1],  // Down-Right
    [1, -1], // Down-Left
    [-1, 1], // Up-Right
    [-1, -1] // Up-Left
  ];

  const matches = (row, col, directionRow, directionCol) => {
    for (let i = 0; i < wordLength; i++) {
      const newRow = row + i * directionRow;
      const newCol = col + i * directionCol;

      if (
        newRow < 0 || newRow >= rows || 
        newCol < 0 || newCol >= cols || 
        matrix[newRow][newCol] !== targetWord[i]
      ) {
        return false;
      }
    }
    return true;
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const [directionRow, directionCol] of directions) {
        if (matches(row, col, directionRow, directionCol)) {
          xmasAppearances++;
        }
      }
    }
  }

  return xmasAppearances;
}

const wordSearchInput = String(readChallengeInput('input.txt'));
const wordSearchMatrix = wordSearchInput.split('\r\n').map(row => row.split(""));

const appearancesOfXmas = countOccurrencesOfWord(wordSearchMatrix);

console.log(`Occurrences of XMAS = ${appearancesOfXmas}`);


