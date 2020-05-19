require("dotenv").config();

function safeGet(keyName: string, defaultValue?: any) {
    const value = process.env[keyName];

    if (!value) {
        return defaultValue;
    }

    return value;
}

export function getPort() {
    return safeGet('PORT', 3000);
}

export function getMongoDb() {
    return safeGet('mongodb_address', "mongodb://localhost:27017/files");
}

export function getUploadedPath() {
    return safeGet('upload_path', '');
}
