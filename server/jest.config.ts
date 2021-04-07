export default {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['js', 'ts', 'jsx', 'tsx'],
  modulePathIgnorePatterns: ['dist'],
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.test.(ts|js)',
  ],
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true,
};
