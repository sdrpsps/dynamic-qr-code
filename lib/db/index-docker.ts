import Database from "better-sqlite3";
import { drizzle as betterSqliteDrizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

export const db = betterSqliteDrizzle(new Database("./data/sqlite.db"), { schema });