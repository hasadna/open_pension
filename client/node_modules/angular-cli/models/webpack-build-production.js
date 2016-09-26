"use strict";
var path = require('path');
var WebpackMd5Hash = require('webpack-md5-hash');
var CompressionPlugin = require('compression-webpack-plugin');
var webpack = require('webpack');
exports.getWebpackProdConfigPartial = function (projectRoot, appConfig) {
    return {
        debug: false,
        devtool: 'source-map',
        output: {
            path: path.resolve(projectRoot, appConfig.outDir),
            filename: '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[name].[chunkhash].bundle.map',
            chunkFilename: '[id].[chunkhash].chunk.js'
        },
        plugins: [
            new WebpackMd5Hash(),
            new webpack.optimize.UglifyJsPlugin({
                mangle: { screw_ie8: true },
                compress: { screw_ie8: true }
            }),
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ],
        tslint: {
            emitErrors: true,
            failOnHint: true,
            resourcePath: path.resolve(projectRoot, appConfig.root)
        },
        htmlLoader: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [
                [/#/, /(?:)/],
                [/\*/, /(?:)/],
                [/\[?\(?/, /(?:)/]
            ],
            customAttrAssign: [/\)?\]?=/]
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
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/angular-cli/models/webpack-build-production.js.map