module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  setupFiles: ['<rootDir>/tests/setup.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/node_modules/**'],
  moduleNameMapper: {
    '@ui/(.*)': '<rootDir>/src/ui/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
  },
};
