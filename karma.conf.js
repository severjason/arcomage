// Karma configuration
// Generated on Wed Jun 21 2017 22:08:52 GMT+0300 (EEST)
const webpackConfig = require('./test.webpack.config');

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '.',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'karma-typescript'],


        // list of files / patterns to load in the browser
        files: [
            // 'app/ts/**/*.spec.ts',
            'node_modules/babel-polyfill/dist/polyfill.js',
            'bower_components/fabric.js/dist/fabric.min.js',
            'app/test/unit/index.spec.ts',
        ],


        // list of files to exclude
        exclude: ['node_modules'],


        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json", // this will get rid of all compiler error messages
        },


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/test/unit/index.spec.ts': ['webpack', 'babel'],
            // 'app/ts/**/*.spec.ts': ['webpack', 'karma-typescript', 'babel'],
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'karma-typescript'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        // webpack configuration
        webpack: webpackConfig,

        // webpack-dev-middleware configuration
        /*webpackMiddleware: {
            stats: 'errors-only'
        },*/

        /*coverageReporter: {
            reporters: [
                {type: 'text-summary'},
            ]
        },*/
    })
};
