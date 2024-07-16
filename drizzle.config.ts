/* eslint-disable node/prefer-global/process */
import { defineConfig } from "drizzle-kit"

export default defineConfig({
	driver: "turso",
	dialect: "sqlite",
	schema: "./server/db/schema.ts",
	out: "./server/db/migrations",
	dbCredentials: {
		url: process.env.TURSO_CONNECTION_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!,
	},
})
