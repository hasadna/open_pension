export class NoDbParamsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoDbParamsError";
    }
}
