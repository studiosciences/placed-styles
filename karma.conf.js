var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['chai'],

    reporters: ['progress'],
    port: 9876,
    colors: false,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    autoWatchBatchDelay: 300,

    files: ['./src/*_test.js'],

    plugins: [
      'karma-chai',
      'karma-babel-preprocessor',
      'karma-webpack',
      'karma-phantomjs-launcher',
    ],

    preprocessors: {
      './src/index.js': ['webpack'],
      './src/*_test.js': ['webpack'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true,
    },
  });
};
