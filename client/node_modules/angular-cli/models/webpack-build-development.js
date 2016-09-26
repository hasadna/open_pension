"use strict";
var path = require('path');
exports.getWebpackDevConfigPartial = function (projectRoot, appConfig) {
    return {
        devtool: 'source-map',
        output: {
            path: path.resolve(projectRoot, appConfig.outDir),
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].map',
            chunkFilename: '[id].chunk.js'
        },
        tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: path.resolve(projectRoot, appConfig.root)
        },
        node: {
            fs: 'empty',
            global: 'window',
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
};
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/angular-cli/models/webpack-build-development.js.map