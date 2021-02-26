import * as Random from "../src/elmish-random";

/*
* 1. Generate a random string with fixed length 10:
*/

// Chars for the string
const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

// Generate a random index of `chars`
const indexGenerator =
    Random.int(0, chars.length - 1);

// Generator a list of random indexes of `chars`
const indexesGenerator =
    Random.list(10, indexGenerator);

// Replace indexes with characters from chars
const charsGenerator =
    indexesGenerator.map(indexes => indexes.map(i => chars[i]));

// Join the characters into a string
const stringWithFixedLengthGenerator =
    charsGenerator.map(chars => chars.join(""));

// Do all of the above in one line
const stringWithFixedLengthGenerator2 =
    Random.list(10, Random.int(0, chars.length - 1))
        .map(indexes => indexes.map(i => chars[i]).join(""));

for (let i = 0; i < 10; i += 1) {
    console.log("Fixed length 1: %s", stringWithFixedLengthGenerator.next());
    console.log("Fixed length 2: %s", stringWithFixedLengthGenerator2.next());
}

/*
* 2. Generate a random string with a random length
*/

// Take the one-line approach from above, turn into a function:
const makeGeneratorForStringWithLength = (l: number): Random.Generator<string> =>
    Random.list(l, Random.int(0, chars.length - 1))
        .map(indexes => indexes.map(i => chars[i]).join(""));

// Generate a random length between 1 an 24
const lengthGenerator = Random.int(1, 24);

// Feed the generated length into the makeGeneratorForStringWithLength
const stringWithRandomLengthGenerator =
    lengthGenerator
        .then(makeGeneratorForStringWithLength)

// Do all of the above in one line (you probably shouldn't):
const stringWithRandomLengthGenerator2 =
    Random.int(1, 24).then(l => Random.list(l, Random.int(0, chars.length - 1)).map(is => is.map(i => chars[i]).join("")));

for (let j = 0; j < 10; j += 1) {
    console.log("Random length 1: %s", stringWithRandomLengthGenerator.next());
    console.log("Random length 2: %s", stringWithRandomLengthGenerator2.next());
}