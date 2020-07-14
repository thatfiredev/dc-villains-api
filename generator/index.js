const fs = require('fs');

const rootDir = '../id/';
const allDir = '../all/';

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
