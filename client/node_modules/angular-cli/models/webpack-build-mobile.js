"use strict";
var path = require('path');
var OfflinePlugin = require('offline-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var prerender_webpack_plugin_1 = require('../utilities/prerender-webpack-plugin');
exports.getWebpackMobileConfigPartial = function (projectRoot, appConfig) {
    // Hardcoded files and paths here should be part of appConfig when
    // reworking the mobile app functionality
    return {
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: path.resolve(projectRoot, appConfig.root, 'icons'),
                    to: path.resolve(projectRoot, appConfig.outDir, 'icons')
                }, {
                    from: path.resolve(projectRoot, appConfig.root, 'manifest.webapp'),
                    to: path.resolve(projectRoot, appConfig.outDir)
                }
            ]),
            new prerender_webpack_plugin_1.PrerenderWebpackPlugin({
                templatePath: 'index.html',
                configPath: path.resolve(projectRoot, appConfig.root, 'main-app-shell.ts'),
                appPath: path.resolve(projectRoot, appConfig.root)
            })
        ]
    };
};
exports.getWebpackMobileProdConfigPartial = function (projectRoot, appConfig) {
    return {
        entry: {
            'sw-install': path.resolve(__dirname, '../utilities/sw-install.js')
        },
        plugins: [
            new OfflinePlugin()
        ]
    };
};
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/angular-cli/models/webpack-build-mobile.js.map