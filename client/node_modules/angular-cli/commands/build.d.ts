export interface BuildOptions {
    target?: string;
    environment?: string;
    outputPath?: string;
    watch?: boolean;
    watcher?: string;
    supressSizes: boolean;
    baseHref?: string;
}
declare const BuildCommand: any;
export default BuildCommand;
