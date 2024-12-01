import fs from "fs";

export function readChallengeInput(filePath) {
    try {
        return fs.readFileSync(filePath, "utf8");
      } catch (err) {
        console.error("Failed to read file:", err);
        return [];
      }
}