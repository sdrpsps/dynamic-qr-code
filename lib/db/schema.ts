import { sql } from "drizzle-orm"
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"

export const users = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
});

export const qrcodes = sqliteTable('qrcodes', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  shortCode: text('short_code').notNull().unique(),
  uploadUrl: text('upload_url').notNull(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
})

// 类型导出
export type QRCode = typeof qrcodes.$inferSelect
export type User = typeof users.$inferSelect
