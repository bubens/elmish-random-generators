import * as Random from "../src/elmish-random";

/*
* Create a generator that simulates rolling 3 dice and then returns their sum.
*/

// create a generator to simulate a dice
const dice =
    Random.int(1, 6);

// create a generator for a list of the dice rolls
const setOfDice =
    Random.list(3, dice);

// helper function to sum up an array
const sum = (set: number[]): number =>
    set.reduce((acc: number, v: number) => acc + v);

// sum up the generated set
const sumOfSet =
    setOfDice.map(sum);

// or you can do all of the above in one line:
const sumOfSet2 =
    Random.list(3, Random.int(1, 6))
        .map(set => set.reduce((acc, v) => acc + v));

for (let i = 0; i < 10; i += 1) {
    console.log(sumOfSet.next());
    console.log(sumOfSet2.next());
}