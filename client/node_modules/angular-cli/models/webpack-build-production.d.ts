export declare const getWebpackProdConfigPartial: (projectRoot: string, appConfig: any) => {
    debug: boolean;
    devtool: string;
    output: {
        path: string;
        filename: string;
        sourceMapFilename: string;
        chunkFilename: string;
    };
    plugins: any[];
    tslint: {
        emitErrors: boolean;
        failOnHint: boolean;
        resourcePath: string;
    };
    htmlLoader: {
        minimize: boolean;
        removeAttributeQuotes: boolean;
        caseSensitive: boolean;
        customAttrSurround: RegExp[][];
        customAttrAssign: RegExp[];
    };
    node: {
        fs: string;
        global: string;
        crypto: string;
        process: boolean;
        module: boolean;
        clearImmediate: boolean;
        setImmediate: boolean;
    };
};
