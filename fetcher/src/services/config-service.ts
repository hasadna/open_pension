require("dotenv").config();

export function safeGet(keyName: string) {
    const value = process.env[keyName];
    if (!value) {
        throw new Error(`${keyName} must be defined`);
    }
    return value;
}

export function getPort() {
    const {PORT} = process.env;
    return parseInt(safeGet("PORT") || "3000");
}

export function getEnv() {
    const {ENV} = process.env;
    return ENV || "dev";
}

export function getKafkaHost() {
    return safeGet("KAFKA_HOST");
}

export function getKafkaTopic() {
    return safeGet("KAFKA_TOPIC");
}

export function getCmsHost() {
    return safeGet('CMS_HOST')
}
