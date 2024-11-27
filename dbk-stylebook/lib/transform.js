//This file transforms the original stylebook.json to have a new key value pair, with the key being the first letter of the term.

const fs = require("fs");

const data = JSON.parse(fs.readFileSync("stylebook.json", "utf8"));

const transformedData = [];

for (const letter in data) {
  data[letter].forEach((item) => {
    const term = Object.keys(item)[0];
    const attributes = item[term];
    //determine the letter based on the first letter of the term
    const firstLetter = term.charAt(0).toUpperCase();
    // Add the term and its attributes to the transformed data
    transformedData.push({
      letter: firstLetter,
      term: term,
      important: attributes.important,
      sports: attributes.sports,
      ap: attributes.ap,
      definition: attributes.definition,
    });
  });
}

// //Sorting it because certain letters were being mixed because of the original placement
transformedData.sort((a, b) => {
  if (a.term < b.term) return -1;
  if (a.term > b.term) return 1;
  return 0;
});

// writing to a new file to preserve the original data
fs.writeFileSync("stylebook.json", JSON.stringify(transformedData, null, 2));
console.log("Transformed data written to transformedData.json");
