require("dotenv").config();
const { ENV, PORT, GOOGLE_STORAGE_BUCKET } = process.env;

export function isDev() {
  return ENV !== "prod" && ENV !== "staging";
}

export function getPort() {
  return parseInt(PORT || "3000");
}

export function getEnv() {
  return ENV || "dev";
}

export function getStorageBucket() {
    if (!GOOGLE_STORAGE_BUCKET) {
        throw new Error("GOOGLE_STORAGE_BUCKET must be defined");
    }
    return GOOGLE_STORAGE_BUCKET;
}
