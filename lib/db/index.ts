import { isTurso } from "@/lib/config";
import { createClient } from "@libsql/client";
import Database from "better-sqlite3";
import { drizzle as betterSqliteDrizzle } from "drizzle-orm/better-sqlite3";
import { drizzle as libsqlDrizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const db = isTurso
  ? libsqlDrizzle(
      createClient({
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN,
      }),
      { schema }
    )
  : betterSqliteDrizzle(new Database("./data/sqlite.db"), { schema });

// import Database from "better-sqlite3";
// import { drizzle as betterSqliteDrizzle } from "drizzle-orm/better-sqlite3";
// import * as schema from "./schema";

// export const db = betterSqliteDrizzle(new Database("./data/sqlite.db"), { schema });
