import { isTurso } from "./lib/config";

export default {
  schema: "lib/db/schema.ts",
  out: "lib/db/migrations",
  dialect: isTurso ? "turso" : "sqlite",
  dbCredentials: {
    url: isTurso ? process.env.TURSO_DATABASE_URL : "./data/sqlite.db",
    authToken: isTurso ? process.env.TURSO_AUTH_TOKEN : undefined,
  },
};
