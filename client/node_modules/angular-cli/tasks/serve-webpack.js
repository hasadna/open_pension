"use strict";
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var SilentError = require('silent-error');
var Task = require('ember-cli/lib/models/task');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var _1 = require('../models/');
var webpack_config_1 = require('../models/webpack-config');
var config_1 = require('../models/config');
var common_tags_1 = require('common-tags');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Task.extend({
    run: function (commandOptions) {
        var ui = this.ui;
        var webpackCompiler;
        var config = new webpack_config_1.NgCliWebpackConfig(this.project, commandOptions.target, commandOptions.environment).config;
        // This allows for live reload of page when changes are made to repo.
        // https://webpack.github.io/docs/webpack-dev-server.html#inline-mode
        config.entry.main.unshift("webpack-dev-server/client?http://" + commandOptions.host + ":" + commandOptions.port + "/");
        webpackCompiler = webpack(config);
        webpackCompiler.apply(new ProgressPlugin({
            profile: true,
            colors: true
        }));
        var proxyConfig = {};
        if (commandOptions.proxyConfig) {
            var proxyPath = path.resolve(this.project.root, commandOptions.proxyConfig);
            if (fs.existsSync(proxyPath)) {
                proxyConfig = require(proxyPath);
            }
            else {
                var message = 'Proxy config file ' + proxyPath + ' does not exist.';
                return Promise.reject(new SilentError(message));
            }
        }
        var webpackDevServerConfiguration = {
            contentBase: path.resolve(this.project.root, "./" + config_1.CliConfig.fromProject().config.apps[0].root),
            historyApiFallback: true,
            stats: _1.webpackDevServerOutputOptions,
            inline: true,
            proxy: proxyConfig
        };
        ui.writeLine(chalk.green((_a = ["\n      **\n      NG Live Development Server is running on\n      http://", ":", ".\n      **\n    "], _a.raw = ["\n      **\n      NG Live Development Server is running on\n      http://", ":", ".\n      **\n    "], common_tags_1.oneLine(_a, commandOptions.host, commandOptions.port))));
        var server = new WebpackDevServer(webpackCompiler, webpackDevServerConfiguration);
        return new Promise(function (resolve, reject) {
            server.listen(commandOptions.port, "" + commandOptions.host, function (err, stats) {
                if (err) {
                    console.error(err.stack || err);
                    if (err.details) {
                        console.error(err.details);
                    }
                    reject(err.details);
                }
            });
        });
        var _a;
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/angular-cli/tasks/serve-webpack.js.map