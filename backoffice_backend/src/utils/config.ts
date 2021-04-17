// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

function safeGet(name: string, defaultValue = null) {
  return process.env[name] ? process.env[name] : defaultValue;
}

export function getPort() {
  return safeGet('PORT', 4000);
}

export function getMongoURL() {
  return safeGet('dbURL', 'mongodb://127.0.0.1/test');
}

export function getStorageAddress() {
  return safeGet('storageAddress', 'http://storage');
}

export function getTempStorageFiles() {
  return safeGet('tempStorageFiles', '');
}

export function getPusherCredentials() {
  return {
    appId: safeGet("pusher_app_id"),
    key: safeGet("pusher_key"),
    secret: safeGet("pusher_secret"),
    cluster: safeGet("pusher_cluster", "ap2"),
  };
}

export function getSaltRounds() {
  return safeGet('saltRounds', 10);
}
