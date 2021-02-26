# Elmish random generators

`elmish-random-generators` provides random generators that are based on the [elm/random](https://github.com/elm/random) [package](https://package.elm-lang.org/packages/elm/random/latest/). It is not a 1-to-1 new implementation of the elm / random package in Typescript, but an attempt to transfer the idioms and implementation details from Elm to Typescript while retaining the incredible flexibility of the pluggable random number generators that keep creating new random number generators. Use and examples can be found in the project. 

## Build

`elmish-random-generators` does not require any dependencies to be built and/or run. So if you don't want to run the tests or build the docs - and have a local/global tsc/ts-node/deno installed - you can skip installing the dependencies.

Otherwise do 
```sh
npm install
```
to install the necessary dependencies to run the tests and build the docs.


See and edit `tsconfig.json` for the target configurations. Then run
```sh
npm run make-js
```
to build the JS. Output will be in `/js`. 

## Test

After installing the dependencies run
```sh
npm run test
```
to run the tests.

## Docs

After installing the dependencies run
```sh
npm run make-docs
```
to build the docs. Output will be in `/docs`.
