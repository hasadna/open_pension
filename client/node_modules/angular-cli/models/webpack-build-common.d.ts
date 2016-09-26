export declare function getWebpackCommonConfig(projectRoot: string, environment: string, appConfig: any, baseHref: string): {
    devtool: string;
    resolve: {
        extensions: string[];
        root: string;
    };
    context: string;
    entry: {
        [key: string]: string[];
    };
    output: {
        path: string;
        filename: string;
    };
    module: {
        preLoaders: {
            test: RegExp;
            loader: string;
            exclude: RegExp[];
        }[];
        loaders: ({
            test: RegExp;
            loaders: ({
                loader: string;
                query: {
                    useForkChecker: boolean;
                    tsconfig: string;
                };
            } | {
                loader: string;
            })[];
            exclude: RegExp[];
        } | {
            exclude: any;
            test: RegExp;
            loaders: string[];
        } | {
            include: any;
            test: RegExp;
            loaders: string[];
        } | {
            include: any;
            test: RegExp;
            loader: string;
        } | {
            test: RegExp;
            loader: string;
        })[];
    };
    plugins: any[];
    node: {
        fs: string;
        global: string;
        crypto: string;
        module: boolean;
        clearImmediate: boolean;
        setImmediate: boolean;
    };
};
