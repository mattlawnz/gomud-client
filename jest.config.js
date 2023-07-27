/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // to obtain access to the matchers.
  setupFilesAfterEnv: ['./setupTests.ts'],
};
