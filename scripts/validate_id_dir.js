const fs = require('fs');

const rootDir = '../id/';

function throwIfDoesntContainField(field, fieldName) {
    if (!field) throw "Missing " + fieldName + " field";
}

function validatePowerstats(powerStats) {
    throwIfDoesntContainField(powerStats.intelligence, "intelligence");
    throwIfDoesntContainField(powerStats.strength, "strength");
    throwIfDoesntContainField(powerStats.speed, "speed");
    throwIfDoesntContainField(powerStats.durability, "durability");
    throwIfDoesntContainField(powerStats.power, "power");
    throwIfDoesntContainField(powerStats.combat, "combat");
}

function validateAppearance(appearance) {
    throwIfDoesntContainField(appearance.gender, "appearance.gender");
    throwIfDoesntContainField(appearance.height, "appearance.height");
    throwIfDoesntContainField(appearance.weight, "appearance.weight");
    throwIfDoesntContainField(appearance.eyeColor, "appearance.eyeColor");
    throwIfDoesntContainField(appearance.hairColor, "appearance.hairColor");
}

function validateBiography(biography) {
    throwIfDoesntContainField(biography.alterEgos, "biography.alterEgos");
    throwIfDoesntContainField(biography.aliases, "biography.aliases");
    throwIfDoesntContainField(biography.placeOfBirth, "biography.placeOfBirth");
    throwIfDoesntContainField(biography.firstAppearance, "biography.firstAppearance");
    throwIfDoesntContainField(biography.publisher, "biography.publisher");
    throwIfDoesntContainField(biography.alignment, "biography.alignment");
}

function validateWork(work) {
    throwIfDoesntContainField(work.occupation, "work.occupation");
    throwIfDoesntContainField(work.base, "work.base");
}

function validateConnections(connections) {
    throwIfDoesntContainField(connections.groupAffiliation, "connections.groupAffiliation");
    throwIfDoesntContainField(connections.relatives, "connections.relatives");
}

function validateImages(images) {
    throwIfDoesntContainField(images.xs, "images.xs");
    throwIfDoesntContainField(images.sm, "images.sm");
    throwIfDoesntContainField(images.md, "images.md");
    throwIfDoesntContainField(images.lg, "images.lg");
}

function validateCharacter(character) {
    throwIfDoesntContainField(character.id, "id");
    throwIfDoesntContainField(character.name, "name");
    console.log("Checking character " + character.id, character.name);
    throwIfDoesntContainField(character.slug, "slug");
    throwIfDoesntContainField(character.powerstats, "powerstats");
    validatePowerstats(character.powerstats);
    throwIfDoesntContainField(character.appearance, "appearance");
    validateAppearance(character.appearance);
    throwIfDoesntContainField(character.biography, "biography");
    validateBiography(character.biography);
    throwIfDoesntContainField(character.work, "work");
    validateWork(character.work);
    throwIfDoesntContainField(character.connections, "connections");
    validateConnections(character.connections);
    throwIfDoesntContainField(character.images, "images");
    validateImages(character.images);
    console.log(character.id, character.name + " is valid.")
}

let allDirectories = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirpath => dirpath.isDirectory())
    .map(dirpath => dirpath.name);

allDirectories.forEach(dirName => {
    let character = JSON.parse(fs.readFileSync(rootDir + dirName + '/index.json', 'utf8'));
    validateCharacter(character);
});
