import { isTurso, TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "./lib/config";

export default {
  schema: "lib/db/schema.ts",
  out: "lib/db/migrations",
  dialect: isTurso ? "turso" : "sqlite",
  dbCredentials: {
    url: isTurso ? TURSO_DATABASE_URL : "./data/sqlite.db",
    authToken: isTurso ? TURSO_AUTH_TOKEN : undefined,
  },
};
