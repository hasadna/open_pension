"use strict";
var rimraf = require('rimraf');
var path = require('path');
var Task = require('ember-cli/lib/models/task');
var webpack = require('webpack');
var webpack_config_1 = require('../models/webpack-config');
var _1 = require('../models/');
// Configure build and output;
var lastHash = null;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Task.extend({
    // Options: String outputPath
    run: function (runTaskOptions) {
        var project = this.cliProject;
        rimraf.sync(path.resolve(project.root, runTaskOptions.outputPath));
        var config = new webpack_config_1.NgCliWebpackConfig(project, runTaskOptions.target, runTaskOptions.environment, runTaskOptions.outputPath, runTaskOptions.baseHref).config;
        var webpackCompiler = webpack(config);
        var ProgressPlugin = require('webpack/lib/ProgressPlugin');
        webpackCompiler.apply(new ProgressPlugin({
            profile: true
        }));
        return new Promise(function (resolve, reject) {
            webpackCompiler.run(function (err, stats) {
                // Don't keep cache
                // TODO: Make conditional if using --watch
                webpackCompiler.purgeInputFileSystem();
                if (err) {
                    lastHash = null;
                    console.error(err.stack || err);
                    if (err.details) {
                        console.error(err.details);
                    }
                    reject(err.details);
                }
                if (stats.hash !== lastHash) {
                    lastHash = stats.hash;
                    process.stdout.write(stats.toString(_1.webpackOutputOptions) + '\n');
                }
                resolve();
            });
        });
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/angular-cli/tasks/build-webpack.js.map