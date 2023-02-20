module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    moduleNameMapper: {
        '^Components/(.*)$': '<rootDir>src/components/$1',
        '^Modules/(.*)$': '<rootDir>src/modules/$1',
        '^Slices/(.*)$': '<rootDir>src/slices/$1',
        '^SourceRoot/(.*)$': '<rootDir>src/$1',
        '^Testing/(.*)$': '<rootDir>src/testing/$1',
        '^Utils/(.*)$': '<rootDir>src/utils/$1',
    },
    roots: ['<rootDir>'],
    setupFiles: ['<rootDir>/src/testing/.jest/jestEnv.js'],
    testEnvironment: 'jsdom',
    transform: {
        '.+\\.(less|css)$': 'jest-css-modules-transform',
        '^.+\\.(ts|tsx)?$': 'babel-jest',
    },
    verbose: true,
};
