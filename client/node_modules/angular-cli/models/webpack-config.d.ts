export declare class NgCliWebpackConfig {
    ngCliProject: any;
    target: string;
    environment: string;
    config: any;
    private devConfigPartial;
    private prodConfigPartial;
    private baseConfig;
    constructor(ngCliProject: any, target: string, environment: string, outputDir?: string, baseHref?: string);
    generateConfig(): void;
}
