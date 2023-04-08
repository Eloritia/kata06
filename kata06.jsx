///INFO
//Kata 06
//link: http://codekata.com/kata/kata06-anagrams/
//Written by Galina Vitvitskaya

console.log("Kata 06 Anagrams");
const fs = require("fs");
const startTime = Date.now();

//Get all words and split them at newline
//my txt file had an \r for some reason in addition to \n so we're escaping this here
const wordsList = fs.readFileSync("./wordsList.txt").toString().replace(/[\r]/g, "").split("\n");
let anagrams = new Map();

for (let i = 0; i < wordsList.length; i++) {
  //breaks down the word to alphabetically sorted letters
  const anagram_key = wordsList[i].split("").sort().join("");
  const existingAnagram = anagrams.get(anagram_key);
  //checks if this key already exists and adds the found word to the list of anagrams
  //otherwise creates the key in the anagrams
  if (existingAnagram) {
    existingAnagram.push(wordsList[i]);
  } else {
    anagrams.set(anagram_key, [wordsList[i]]);
  }
}

let fileToWrite = "Kata 06 Anagrams List" + "\n" + "Created at " + new Date().toLocaleTimeString() + " on " + new Date().toLocaleDateString();
let anagramsList = "";

let totalNumberOfAnagrams = 0;
let totalNumberOfAnagramWords = 0;
let longestAnogramedWordSet = [""];
let longestSet = [""];

anagrams.forEach((ana) => {
  if (ana.length > 1) {
    anagramsList += "\n" + JSON.stringify(ana).slice(1, -1).replace(/["']/g, " ").trim();
    if (ana[0].length > longestAnogramedWordSet[0].length) {
      longestAnogramedWordSet = ana;
    }
    if (ana.length > longestSet.length) {
      longestSet = ana;
    }
    totalNumberOfAnagramWords += ana.length;
    totalNumberOfAnagrams++;
  }
});

fileToWrite += `\nTotal Number of Anagram sets found: ${totalNumberOfAnagrams} (${totalNumberOfAnagramWords} words)` + `\nTotal time taken: ${Date.now() - startTime} ms` + `\nLongest anogrammed word set (at ${longestAnogramedWordSet[0].length} letters per word): ${JSON.stringify(longestAnogramedWordSet).slice(1, -1).replace(/["']/g, " ").trim()}` + `\nLongest set (${longestSet.length} words): ${JSON.stringify(longestSet).slice(1, -1).replace(/["']/g, " ").trim()}` + `\n----ANAGRAMS LIST ----` + anagramsList;

const fileName = "./Kata06Anagrams" + startTime.toString() + ".txt";
fs.writeFileSync(fileName, fileToWrite);
console.log(`New file with the name ${fileName} has been created.`);
