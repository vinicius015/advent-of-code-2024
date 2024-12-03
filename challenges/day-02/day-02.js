import { readChallengeInput } from "../../utils/utils.js";

const isIncreasing = (levels) => {
  for (let i = 0; i < levels.length - 1; i++) {
    if (levels[i] > levels[i + 1]) {
      return false;
    }
  }
  return true;
};

const isDecreasing = (levels) => {
  for (let i = 0; i < levels.length - 1; i++) {
    if (levels[i] < levels[i + 1]) {
      return false;
    }
  }
  return true;
};

const isOrderCorrect = (levels) => {
  return isDecreasing(levels) || isIncreasing(levels);
};

const areDifferencesCorrect = (levels) => {
  for (let i = 0; i < levels.length - 1; i++) {
    const differenceBetweenLevels = Math.abs(levels[i] - levels[i + 1]);

    if (differenceBetweenLevels < 1 || differenceBetweenLevels > 3) {
      return;
    }
  }

  return true;
};

const reports = String(readChallengeInput("input.txt")).split("\r\n");

let safeReports = 0;
let correctedSafeReports = 0;
let unsafeLevels = [];

reports.forEach((level) => {
  const levels = Array.from(level.split(/\s/), Number);
  const isValidLevel = isOrderCorrect(levels) && areDifferencesCorrect(levels);

  isValidLevel ? (safeReports += 1) : unsafeLevels.push(level);
});

unsafeLevels.forEach((level) => {
  const levels = Array.from(level.split(/\s/), Number);

  for (let i = 0; i < levels.length; i++) {
    const currentLevel = [...levels];
    currentLevel.splice(i, 1);

    const isValidLevel =
      isOrderCorrect(currentLevel) && areDifferencesCorrect(currentLevel);

    if (isValidLevel) {
      correctedSafeReports += 1;
      break;
    }
  }
});

const totalSafeReports = safeReports + correctedSafeReports;

console.log(`The number of safe reports is = ${safeReports}`);
console.log(`The number of safe reports after problem dampener = ${totalSafeReports}`);
