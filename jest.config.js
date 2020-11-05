module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@helpers/(.*)': '<rootDir>/src/app/helpers/$1',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
