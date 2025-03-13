import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3_ACCESS_KEY, S3_BUCKET, S3_DOMAIN, S3_ENDPOINT, S3_FILE_PREFIX, S3_REGION, S3_SECRET_KEY } from "./config";

const s3Client = new S3Client({
  endpoint: S3_ENDPOINT,
  region: S3_REGION!,
  credentials: {
    accessKeyId: S3_ACCESS_KEY!,
    secretAccessKey: S3_SECRET_KEY!,
  },
});

export async function createPresignedPutUrl(key: string) {
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET!,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 3600, // 1小时过期
  });

  return url;
}

export function getPrefixUrl(key: string): string {
  const filePrefix = S3_FILE_PREFIX
    ? `${S3_FILE_PREFIX}/`
    : "";

  return `${filePrefix}${key}`;
}

export function getObjectUrl(key: string): string {
  return `${S3_DOMAIN}/${getPrefixUrl(key)}`;
}
