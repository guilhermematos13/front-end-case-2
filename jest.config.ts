import nextJest from 'next/jest'
const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$':
      require.resolve('jest-transform-stub'),
  },

  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}

module.exports = createJestConfig(customJestConfig)
