import * as Random from "../src/elmish-random";

const continousSource = (precision: number): Random.Source<number> => {
    let x = 0;
    let y = 10**(-precision)
    return () => {
        x += y;
        if (x === 0 || x === 1) {  
            y *= -1;
        }
        return x;
    };
};

test("simpleSeeded() generates pseudo random numbers between 0 and 1", () => {
    const source = Random.simpleSeeded(1234);
    const n = 1000;

    const tmp =
        Array(n)
            .fill(0, 1, n)
            .map(source)
            .every( x => x >= 0 && x <= 1);
    
    expect(tmp).toBe(true);
})

test("Random.constant() returns constant value", () => {
    const generator = Random.constant(3);

    expect(generator.next()).toBe(3);
});

test("Generator.next() returns a flat value", () => {
    const xo =
        Random.constant("XO");
    
    expect(xo.next()).toBe("XO");
})

test("Generator.map() transforms a value within a generator", () => {
    const xo =
        Random.constant("X")
            .map(x => x+"O");
    
    expect(xo.next()).toBe("XO");
});

test("Generator.then() uses random value to create new generator", () => {
    const xo =
        Random.constant("X")
            .then(x => Random.constant(x+"O"));
    
    expect(xo.next()).toBe("XO");
});

test("float() returns float", () => {
    const generator = Random.float(0, 1, Random.constant(.5).next);

    expect(generator.next()).toBe(.5);
});

test("float(min, max) generates numbers within bounds", () => {
    const min = 0;
    const max = 10;
    const n = 1000;
    const generator = Random.float(min, max, Math.random);

    const temp =
        Array(n)
            .fill(0, 0, n)
            .map(generator.next)
            .every((x: number) => (x >= 0 && x <= 10));

    expect(temp).toBe(true);
});

test("floatWithPrecision(min, max, prec) generates numbers with precision", () => {
    const min = 0;
    const max = 1;

    for (let i = 0; i < 15; i += 1) {
        let generator =
            Random.floatWithPrecision(0, 1, i)
                .map(x => (x + "").length);

        expect(generator.next()).toBeLessThanOrEqual(i + 2);
    }
});

test("int(min,max) generates ints", () => {
    const n = 1000;
    const generator =
        Random.int(0, 10)
            .map(x => x % 1 === 0);

    const allInts =
        Array(n)
            .fill(0, 0, n)
            .map(generator.next)
            .every(v => v === true);

    expect(allInts).toBe(true);
});

test("int(min,max) generates ints within bounds", () => {
    const min = 0;
    const max = 10;
    const n = 1000;
    const generator = Random.int(min, max);

    const temp =
        Array(n)
            .fill(0, 0, n)
            .map(generator.next)
            .every((x: number) => (x >= min && x <= max));

    expect(temp).toBe(true);
});

test("int(min,max) generates every int withing bounds", () => {
    const min = 0;
    const max = 100;
    const n = 1000;
    const generator = 
        Random.int(min, max);
    
    const tmp =
        Array(n)
            .fill(0,0,n)
            .map(generator.next)
            .reduce(
                (acc: number[], v:number) => {
                    acc[v] = acc[v] === undefined ? 1 : acc[v]+1;
                    return acc;
                },
                []
            ).every(v => v > 0);
    
    expect(tmp).toBe(true);
            
});

test("boolean() generates booleans", () => {
    const generator = Random.boolean();
    
    const temp =
        Array(1000)
            .fill(0, 0, 1000)
            .map(generator.next)
            .every( b => typeof(b) === "boolean");
    
    expect(temp).toBe(true);
});

test("uniform() picks items from list", () => {
    const list = ["eins", "zwei", "drei", "vier", "fünf"];
    const generator = Random.uniform(list[0], list.slice(1));
    const n = 1000;

    const tmp =
        Array(n)
            .fill(0,0,n)
            .map(generator.next)
            .every( s => list.indexOf(s) >= 0);
    
    expect(tmp).toBe(true);
});

test("weighted() picks items from list", () => {
    const weightedList:Array<[string, number]> = [["eins", 10], ["zwei", 20], ["drei", 40], ["vier", 20], ["fünf", 10]];
    const rawList = weightedList.map(([s,_]) => s);
    const generator = Random.weighted(weightedList[0], weightedList.slice(1));
    const n = 1000;

    const isInList = (s:string) =>
        rawList.some(r => r === s);

    const tmp =
        Array(n)
            .fill(0,0,n)
            .map(generator.next)
            .every( isInList ) ;
    
    expect(tmp).toBe(true);
});

test("pair() generates pairs with given types", () => {
    const x =
        Random.constant("X");
    
    const o =
        Random.constant("O");
    
    const pair =
        Random.pair(x, o);

    expect(pair.next()).toStrictEqual<[string, string]>(["X", "O"]);
});

test("list() generates lists from given generator", () => {
    const x =
        Random.constant("X");
    
    const list =
        Random.list(10, x);
    
    expect(list.next())
        .toStrictEqual<Array<string>>(Array(10).fill("X"));
});

test("list() generates lists with given length", () => {
    const listLength =
        Random.list(25, Random.int(0,10))
            .map(l => l.length);
    
    const tmp =
        Array(1000)
            .fill(0,0,1000)
            .map(listLength.next)
            .every(x => x === 25);
    
    expect(tmp).toBe(true);
            
});