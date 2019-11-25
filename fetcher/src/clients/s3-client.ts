import AWS from "aws-sdk";
import { ReadStream } from "fs";
import { ReportRow } from "types/report-row";

const Bucket = process.env.S3_BUCKET;
const s3 = new AWS.S3();

const extensionsToMimeTypes = {
  xlsx: "application/vnd.ms-excel"
};

export async function streamToS3(
  row: ReportRow,
  fileStream: ReadStream
): Promise<string> {
  const Key = row.DocumentId + "." + row.fileExt;
  const params = { Bucket, Key };
  const downloadLink = `https://${Bucket}.s3-eu-west-1.amazonaws.com/${Key}`;

  try {
    await s3.headObject(params).promise();
    console.log(`${Key} already exists in bucket`);
    return downloadLink;
  } catch (error) {
    if (error.code != "NotFound") throw error;
  }

  console.log(`Streaming ${Key} to S3`);
  await s3
    .upload({
      ...params,
      Body: fileStream,
      ContentType: extensionsToMimeTypes[row.fileExt],
      ACL: "public-read"
    })
    .promise();
  console.log(`${Key} uploaded to S3`);
  return downloadLink;
}
