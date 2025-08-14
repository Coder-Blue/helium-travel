import { relations } from "drizzle-orm";
import { int, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import type { SelectLocationLog } from "./location-log";

import { user } from "./auth";
import { locationLog } from "./location-log";

export const location = sqliteTable("location", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  userId: int().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
}, t => [
  unique().on(t.name, t.userId),
]);

export const locationRelations = relations(location, ({ many }) => ({
  locationLogs: many(locationLog),
}));

export const InsertLocation = createInsertSchema(location, {
  name: field => field.min(1, { message: "Tên địa điểm phái có ít nhất 1 kí tự" }).max(100, { message: "Tên địa điểm không được nhiều hơn 100 kí tự" }),
  description: field => field.max(1000, { message: "Mô tả địa điểm không nhiều hơn 1000 kí tự" }),
  lat: z.coerce.number().min(-90, { message: "Vĩ độ không được thấp hơn -90 độ" }).max(90, { message: "Vĩ độ không được cao hơn 90 độ" }),
  long: z.coerce.number().min(-180, { message: "Kinh độ không được thấp hơn -180 độ" }).max(180, { message: "Kinh độ không được cao hơn 180 độ" }),
}).omit({
  id: true,
  slug: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertLocation = z.infer<typeof InsertLocation>;
export type SelectLocation = typeof location.$inferSelect;

export type SelectLocationWithLogs = SelectLocation & {
  locationLogs: SelectLocationLog[];
};
