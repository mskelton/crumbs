module.exports = {
  collectCoverageFrom: ['<rootDir>/packages/*/src/**/*.{ts,tsx}'],
  coverageDirectory: '<rootDir>/coverage/',
  projects: ['<rootDir>/packages/'],
  testPathIgnorePatterns: ['<rootDir>/template'],
}
