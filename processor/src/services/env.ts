require("dotenv").config();

function safeGet(keyName: string, defaultValue?: any) {
    const value = process.env[keyName];

    if (!value) {
        return defaultValue;
    }

    return value;
}

export function getPort(): number {
    return safeGet('PORT', 3000);
}

export function getMongoDb(): string {
    return safeGet('mongodb_address', "mongodb://localhost:27017/files");
}

export function getUploadedPath(): string {
    return safeGet('upload_path', '');
}

export function getKafkaHost() {
    return safeGet("KAFKA_HOST");
}

export function getKafkaTopic() {
    return safeGet("KAFKA_TOPIC");
}

