export declare const getWebpackMobileConfigPartial: (projectRoot: string, appConfig: any) => {
    plugins: any[];
};
export declare const getWebpackMobileProdConfigPartial: (projectRoot: string, appConfig: any) => {
    entry: {
        'sw-install': string;
    };
    plugins: any[];
};
