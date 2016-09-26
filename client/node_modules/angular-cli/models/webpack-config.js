"use strict";
var webpackMerge = require('webpack-merge');
var config_1 = require('./config');
var _1 = require('./');
var NgCliWebpackConfig = (function () {
    function NgCliWebpackConfig(ngCliProject, target, environment, outputDir, baseHref) {
        this.ngCliProject = ngCliProject;
        this.target = target;
        this.environment = environment;
        var config = config_1.CliConfig.fromProject();
        var appConfig = config.config.apps[0];
        appConfig.outDir = outputDir || appConfig.outDir;
        this.baseConfig = _1.getWebpackCommonConfig(this.ngCliProject.root, environment, appConfig, baseHref);
        this.devConfigPartial = _1.getWebpackDevConfigPartial(this.ngCliProject.root, appConfig);
        this.prodConfigPartial = _1.getWebpackProdConfigPartial(this.ngCliProject.root, appConfig);
        if (appConfig.mobile) {
            var mobileConfigPartial = _1.getWebpackMobileConfigPartial(this.ngCliProject.root, appConfig);
            var mobileProdConfigPartial = _1.getWebpackMobileProdConfigPartial(this.ngCliProject.root, appConfig);
            this.baseConfig = webpackMerge(this.baseConfig, mobileConfigPartial);
            this.prodConfigPartial = webpackMerge(this.prodConfigPartial, mobileProdConfigPartial);
        }
        this.generateConfig();
    }
    NgCliWebpackConfig.prototype.generateConfig = function () {
        switch (this.target) {
            case 'development':
                this.config = webpackMerge(this.baseConfig, this.devConfigPartial);
                break;
            case 'production':
                this.config = webpackMerge(this.baseConfig, this.prodConfigPartial);
                break;
            default:
                throw new Error("Invalid build target. Only 'development' and 'production' are available.");
        }
    };
    return NgCliWebpackConfig;
}());
exports.NgCliWebpackConfig = NgCliWebpackConfig;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/angular-cli/models/webpack-config.js.map