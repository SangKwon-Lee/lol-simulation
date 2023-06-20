// webpack.config.js

module.exports = {
  target: ['web', 'es2017'],
  output: {
    module: true
  },
  experiments: {
    outputModule: true
  }
};
