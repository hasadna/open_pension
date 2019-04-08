export class NoDbParamsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoDbParamsError";
    }
}

export class MigrationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MigrationError";
    }
}

export class DBConnectionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MigrationError";
    }
}
