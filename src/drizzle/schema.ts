import { pgTable, serial, text, timestamp, vector } from "drizzle-orm/pg-core"

export const postsTable = pgTable("posts", {
  id: serial().primaryKey(),
  title: text().notNull(),
  body: text().notNull(),
  vector: vector({ dimensions: 384 }).notNull(),
  created: timestamp().notNull().defaultNow(),
})
