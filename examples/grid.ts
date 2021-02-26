import * as Random from "../src/elmish-random";

/*
* Create a generator that generates a 10x10 grid with randomly distributed Xs and Os in string form.
* Because why not!
*/

// Helper function to turn a 2D array of boolean values into a grid of Xs and Os.
const toStringGrid = (grid: boolean[][]): string =>
    grid.reduce(
        (acc, row) =>
            acc + row.reduce(
                (a, cell) =>
                    cell
                        ? a + "X"
                        : a + "O"
                , ""
            ) + "\n",
        ""
    );


// Generator for lists of 10 random boolean values
const boolListGenerator =
    Random.list(10, Random.boolean());

// Generator for 2D array of boolean values
const boolGridGenerator =
    Random.list(10, boolListGenerator);

// Turn the 2D array into the string-grid
const gridGenerator =
    boolGridGenerator.map(toStringGrid);

// or you can do all of the above in one line:
const gridGenerator2 =
    Random.list(
        10,
        Random.list(10, Random.boolean())
    ).map(toStringGrid);

for (let i = 0; i < 10; i += 1) {
    console.log(gridGenerator.next() + "\n\n");
    console.log(gridGenerator2.next() + "\n\n");
}


