export const S3_REGION = process.env.S3_REGION;
export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
export const S3_SECRET_KEY = process.env.S3_SECRET_KEY;
export const S3_BUCKET = process.env.S3_BUCKET;
export const S3_ENDPOINT = process.env.S3_ENDPOINT;
export const S3_FILE_PREFIX = process.env.S3_FILE_PREFIX;
export const S3_DOMAIN = process.env.S3_DOMAIN;

export const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
export const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

export const APP_DOMAIN = process.env.APP_DOMAIN || process.env.VERCEL_URL;
export const LOGO_URL = process.env.LOGO_URL;

export const USER_USERNAME = process.env.USER_USERNAME;
export const USER_PASSWORD = process.env.USER_PASSWORD;

export const isTurso =
  !!process.env.TURSO_DATABASE_URL && !!process.env.TURSO_AUTH_TOKEN;
