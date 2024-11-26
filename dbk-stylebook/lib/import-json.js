const fs = require('fs');

const data = JSON.parse(fs.readFileSync('stylebook.json', 'utf8'));

let csv = 'id,letter,term,important,sports,ap,definition\n';
let id = 1;

// creating the csv rows
data.forEach(item => {
    csv += `${id},${item.letter},"${item.term}",${item.important},${item.sports},${item.ap},"${item.definition.replace(/"/g, '""')}"\n`;
    id++;
});

// Writing it to a new file in case we need to hold on to the old data
fs.writeFileSync('data.csv', csv);
console.log('Data written to data.csv');