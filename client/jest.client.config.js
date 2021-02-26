module.exports = {
  displayName: 'client-side',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>setupTests.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/hooks/api/test/fileMock.js',
    '^src(.*)$': '<rootDir>/src$1',
    '^mocks/(.*)$': '<rootDir>/mocks/$1',
  },
  // transform: {
  //   '\\.(png)$': '<rootDir>/src/hooks/api/test/fileTransformer.js',
  // },
  globals: {
    'ts-jest': {
      babelConfig: 'babel.config.js',
    },
  },
  coveragePathIgnorePatterns: ['<rootDir>/.yarn_cache/', '<rootDir>/node_modules/', '<rootDir>/dist'],
  testPathIgnorePatterns: ['<rootDir>/.yarn_cache/', '<rootDir>/node_modules/', '<rootDir>/dist'],
};
