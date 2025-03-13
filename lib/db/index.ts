import { isTurso, TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "@/lib/config";
import { createClient } from "@libsql/client";
import Database from "better-sqlite3";
import { drizzle as betterSqliteDrizzle } from "drizzle-orm/better-sqlite3";
import { drizzle as libsqlDrizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const db = isTurso
  ? libsqlDrizzle(
      createClient({
        url: TURSO_DATABASE_URL!,
        authToken: TURSO_AUTH_TOKEN,
      }),
      { schema }
    )
  : betterSqliteDrizzle(new Database("./data/sqlite.db"), { schema });
