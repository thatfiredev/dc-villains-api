const fs = require('fs');
const rimraf = require('rimraf');

const rootDir = 'id/';
const allDir = 'all/';
const pagedDir = 'cursor/';

let allDirectories = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirpath => dirpath.isDirectory() )
    .map(dirpath => dirpath.name);

let characterList = [];
allDirectories.forEach(dirName => {
    let character = JSON.parse(fs.readFileSync(rootDir + dirName + '/index.json', 'utf8'));
    characterList.push(character);
});
characterList.sort((a, b) => a.name.localeCompare(b.name));

// create /all/index.json
fs.mkdirSync(allDir, { recursive: true });
fs.writeFileSync(allDir + 'index.json', JSON.stringify(characterList, null, 2));
console.log(allDir + 'index.json created!');


// create paginated data
let currentCursor = -1;

let pagesNumber = Math.ceil(characterList.length / 10);
console.log('Creating ' + pagesNumber + ' pages.');

// delete current pagination
rimraf.sync(pagedDir);

let page; // Page objects
let sliceStart;
let sliceEnd;
let pagedCharacters;
let previous_cursor;
let next_cursor;

let cursorDir;
for (let i = 0; i < pagesNumber; i++) {
    sliceStart = i * 10;
    sliceEnd = sliceStart + 10;
    pagedCharacters = characterList.slice(sliceStart, sliceEnd);

    // If this is the first page
    if (i === 0) {
        previous_cursor = 0;
    }

    // If this is the last page
    if (i === pagesNumber - 1) {
        next_cursor = 0;
    } else {
        next_cursor = characterList[sliceEnd].id
    }

    page = {
        characters: pagedCharacters,
        previous_cursor: previous_cursor,
        next_cursor: next_cursor
    };

    cursorDir = pagedDir + currentCursor;
    // create new pagination
    fs.mkdirSync(cursorDir, { recursive: true });
    fs.writeFileSync(cursorDir + '/index.json', JSON.stringify(page, null, 2));

    previous_cursor = currentCursor;
    currentCursor = next_cursor;
}
console.log('Paginated directory created!', pagedDir);

fs.copyFileSync(pagedDir + '-1/index.json', pagedDir + 'index.json', (err) => {
    if (err) throw err;
});
