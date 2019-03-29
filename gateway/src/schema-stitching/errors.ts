export class NoRemoteSchemasFound extends Error {
    constructor(message) {
        super(message);
        this.name = "NoRemoteSchemasFound";
    }
}
