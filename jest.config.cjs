module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        "/node_modules/",
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
    ],
  };