"use strict";
var rimraf = require('rimraf');
var path = require('path');
var Task = require('ember-cli/lib/models/task');
var webpack = require('webpack');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var webpack_config_1 = require('../models/webpack-config');
var _1 = require('../models/');
var lastHash = null;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Task.extend({
    run: function (runTaskOptions) {
        var project = this.cliProject;
        rimraf.sync(path.resolve(project.root, runTaskOptions.outputPath));
        var config = new webpack_config_1.NgCliWebpackConfig(project, runTaskOptions.target, runTaskOptions.environment, runTaskOptions.outputPath, runTaskOptions.baseHref).config;
        var webpackCompiler = webpack(config);
        webpackCompiler.apply(new ProgressPlugin({
            profile: true
        }));
        return new Promise(function (resolve, reject) {
            webpackCompiler.watch({}, function (err, stats) {
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
            });
        });
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/angular-cli/tasks/build-webpack-watch.js.map