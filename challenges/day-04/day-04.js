import { readChallengeInput } from "../../utils/utils.js";

const countOccurrencesOfWord = (matrix, targetWord = "XMAS") => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const wordLength = targetWord.length;
  let xmasAppearances = 0;

  const directions = [
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
    [-1, 0], // Up
    [1, 1], // Down-Right
    [1, -1], // Down-Left
    [-1, 1], // Up-Right
    [-1, -1], // Up-Left
  ];

  const matches = (row, col, directionRow, directionCol) => {
    for (let i = 0; i < wordLength; i++) {
      const newRow = row + i * directionRow;
      const newCol = col + i * directionCol;

      if (
        newRow < 0 ||
        newRow >= rows ||
        newCol < 0 ||
        newCol >= cols ||
        matrix[newRow][newCol] !== targetWord[i]
      ) {
        return;
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
};

const countOccurrencesOfWordinX = (matrix) => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let xmasAppearances = 0;

  const matches = (row, col) => {
    if (
      row - 1 < 0 || row + 1 >= rows ||
      col - 1 < 0 || col + 1 >= cols 
    ) {
      return;
    }

    if (
      matrix[row - 1][col - 1] === "M" &&
      matrix[row - 1][col + 1] === "M" &&
      matrix[row + 1][col - 1] === "S" &&
      matrix[row + 1][col + 1] === "S"
    ) {
      return true;
    }

    if (
      matrix[row - 1][col - 1] === "S" &&
      matrix[row - 1][col + 1] === "S" &&
      matrix[row + 1][col - 1] === "M" &&
      matrix[row + 1][col + 1] === "M"
    ) {
      return true;
    }

    if (
      matrix[row - 1][col - 1] === "M" &&
      matrix[row - 1][col + 1] === "S" &&
      matrix[row + 1][col - 1] === "M" &&
      matrix[row + 1][col + 1] === "S"
    ) {
      return true;
    }

    if (
      matrix[row - 1][col - 1] === "S" &&
      matrix[row - 1][col + 1] === "M" &&
      matrix[row + 1][col - 1] === "S" &&
      matrix[row + 1][col + 1] === "M"
    ) {
      return true;
    }

    return;
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] === "A") {
        if (matches(row, col)) {
          xmasAppearances++;
        }
      }
    }
  }

  return xmasAppearances;
};

const wordSearchInput = String(readChallengeInput("input.txt"));
const wordSearchMatrix = wordSearchInput
  .split("\r\n")
  .map((row) => row.split(""));

const appearancesOfXmas = countOccurrencesOfWordinX(wordSearchMatrix);

console.log(`Occurrences of XMAS = ${appearancesOfXmas}`);
