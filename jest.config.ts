import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    name : "elmish-random-generators",
    verbose : true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageProvider : "babel",
};

export default config;