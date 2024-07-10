import { defineConfig } from "drizzle-kit"

export default defineConfig({
	driver: "turso",
	schema: "./server/db/schema.ts",
	out: "./server/db/migrations",
	dbCredentials: {
		url: "file:./server/database.db",
	},
	dialect: "sqlite",
})
