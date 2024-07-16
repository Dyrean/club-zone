/* eslint-disable node/prefer-global/process */
import { createClient } from "@libsql/client"
import { type LibSQLDatabase, drizzle } from "drizzle-orm/libsql"
import * as schema from "~/server/db/schema"

let _db: LibSQLDatabase<typeof schema> | null = null

/**
 * Get the drizzle database instance.
 * If not yet instantiated, it will be instantiated first time.
 */
export function useDB() {
	if (!_db) {
		const libsql = createClient({
			url: process.env.TURSO_CONNECTION_URL!,
			authToken: process.env.TURSO_AUTH_TOKEN!,
		})
		_db = drizzle(libsql, { schema })
	}

	return _db
}
