import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"
import { Lucia, TimeSpan } from "lucia"
import { sessionTable, userTable } from "../db/schema"

let _lucia: Lucia<Record<string, any>, DatabaseUserAttributes> | null = null

/**
 * Get the lucia instance.
 * If not yet instantiated, it will be instantiated first time.
 */
export function useLucia() {
	if (!_lucia) {
		const db = useDB()
		const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable)

		_lucia = new Lucia(adapter, {
			sessionExpiresIn: new TimeSpan(2, "w"),
			sessionCookie: {
				attributes: {
					secure: !import.meta.dev,
				},
			},
			getSessionAttributes(attributes) {
				return {
					ip: attributes.ip,
				}
			},
			getUserAttributes(attributes) {
				return {
					username: attributes.username,
					email: attributes.email,
					role: attributes.role,
				}
			},
		})
	}

	return _lucia
}

/**
 * To get autocomplete for the `user` object,
 * we need to augment the lucia module.
 */
declare module "lucia" {
	interface Register {
		Lucia: ReturnType<typeof useLucia>
		DatabaseUserAttributes: DatabaseUserAttributes
		DatabaseSessionAttributes: DatabaseSessionAttributes
	}
}

interface DatabaseSessionAttributes {
	ip: string
}

interface DatabaseUserAttributes {
	email: string
	username: string
	role: string
}
