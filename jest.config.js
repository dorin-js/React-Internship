module.exports = async () => {
  console.log('config00');
  return ({
    verbose: true,
    setupFilesAfterEnv: [
      '<rootDir>/setup.js',
    ],
  });
};
