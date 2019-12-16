import { Storage } from "@google-cloud/storage";
import { getStorageBucket } from "services/config-service";

const storage = new Storage();
const bucketName = getStorageBucket();
const bucket = storage.bucket(bucketName);

export async function uploadFile(filename: string) {
  const uploadResponse = await bucket.upload(filename, {
    predefinedAcl: "publicRead"
  });
  return `https://storage.googleapis.com/${bucketName}/${uploadResponse[0].name}`;
}
