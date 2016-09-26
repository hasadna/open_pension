export declare const getWebpackDevConfigPartial: (projectRoot: string, appConfig: any) => {
    devtool: string;
    output: {
        path: any;
        filename: string;
        sourceMapFilename: string;
        chunkFilename: string;
    };
    tslint: {
        emitErrors: boolean;
        failOnHint: boolean;
        resourcePath: any;
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
