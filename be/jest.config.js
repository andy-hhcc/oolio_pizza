module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/test'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    globalSetup: './test/setup/globalSetup.js',
    globalTeardown: './test/setup/globalTeardown.js'
};
