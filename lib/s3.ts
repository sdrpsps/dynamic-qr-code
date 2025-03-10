import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

export async function createPresignedPutUrl(key: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 3600, // 1小时过期
  });

  return url;
}

export function getPrefixUrl(key: string): string {
  const filePrefix = process.env.S3_FILE_PREFIX
    ? `${process.env.S3_FILE_PREFIX}/`
    : "";

  return `${filePrefix}${key}`;
}

export function getObjectUrl(key: string): string {
  return `${process.env.S3_DOMAIN}/${getPrefixUrl(key)}`;
}
