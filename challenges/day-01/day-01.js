import { readChallengeInput } from "../../utils/utils.js";

const locationIds = String(readChallengeInput('input.txt')).split('\r\n');

let leftLocationIds = [];
let rigthLocationIds = [];

locationIds.forEach((line) => {
    const [leftIds, rightIds] = line.split(/\s+/);
    leftLocationIds.push(leftIds);
    rigthLocationIds.push(rightIds);
});

const totalLines = locationIds.length;
leftLocationIds.sort();
rigthLocationIds.sort();

let totalDistance = 0;
let similarityScore = 0;

for (let i = 0; i < totalLines; i++) {
    const distanceBetweenIds = Math.abs(leftLocationIds[i] - rigthLocationIds[i]);
    totalDistance += distanceBetweenIds;

    const totalAppearancesInOppositeList = rigthLocationIds.filter((id) => id === leftLocationIds[i]).length;
    similarityScore += leftLocationIds[i] * totalAppearancesInOppositeList;

}

console.log(`Total distance between left list and right lists is = ${totalDistance}`);
console.log(`Similarity score between left and right lists is = ${similarityScore}`);