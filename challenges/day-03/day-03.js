import { readChallengeInput } from "../../utils/utils.js";

const getValidMultiplicationCommands = (computerMemory) => {
  return computerMemory.match(/mul\(\d+,\s*\d+\)/g);
};

const getMultiplicationValues = (validMultiplicationCommands) => {
  return validMultiplicationCommands.match(/\d+/g);
};

const calculateTotalMultiplicationSum = (validMultiplicationCommands) => {
  let totalMultiplicationSum = 0;

  validMultiplicationCommands.forEach((validMultiplicationCommand) => {
    const multiplicationValues = getMultiplicationValues(
      validMultiplicationCommand
    );

    const multiplicationResult =
      multiplicationValues[0] * multiplicationValues[1];
    totalMultiplicationSum += multiplicationResult;
  });

  return totalMultiplicationSum;
};

const getEnabledBlocks = (computerMemory) => {
  const enabledBlocks = computerMemory.split("do()");
  let totalEnabledBlocks = [];

  if (enabledBlocks.length == 0) {
    return [];
  }

  for (let i = 0; i < enabledBlocks.length; i++) {
    const textUntilDisabledCommand = enabledBlocks[i].substring(
      0,
      enabledBlocks[i].indexOf("don't()")
    );

    if (textUntilDisabledCommand === "") {
      totalEnabledBlocks.push(enabledBlocks[i]);
    } else {
      totalEnabledBlocks.push(textUntilDisabledCommand);
    }
  }

  return totalEnabledBlocks;
};

const computerMemory = String(readChallengeInput("input.txt"));
const validMultiplicationCommands =
  getValidMultiplicationCommands(computerMemory);
let totalMultiplicationSum = calculateTotalMultiplicationSum(
  validMultiplicationCommands
);

let accurateTotalMultiplicationSum = 0;
const enabledBlocks = getEnabledBlocks(computerMemory) ?? [];

enabledBlocks.forEach((enabledBlock) => {
  const commands = getValidMultiplicationCommands(enabledBlock);
  accurateTotalMultiplicationSum += calculateTotalMultiplicationSum(commands);
});

console.log(`Total multiplication sum = ${totalMultiplicationSum}`);
console.log(`Total enabled multiplication sum = ${accurateTotalMultiplicationSum}`);