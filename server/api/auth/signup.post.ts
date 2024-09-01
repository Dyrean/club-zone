import { Argon2id } from "oslo/password"
import { ZodError } from "zod"
import type { H3Event } from "h3"
import { userTable } from "~/server/db/schema"
import { generateRandomID } from "~/server/utils/id"
import { SignupSchema } from "~/types/auth"

export default defineEventHandler(async (event: H3Event) => {
	const { email, password, username } = await readValidatedBody(event, body => SignupSchema.parseAsync(body).catch((error) => {
		if (error instanceof ZodError) {
			throw createError({
				status: 400,
				message: "Invalid data",
				data: error.errors[0].message,
			})
		}
	}))

	const db = useDB()
	const lucia = useLucia()

	const hashedPassword = await new Argon2id().hash(password)
	const userId = generateRandomID("user")

	try {
		await db.insert(userTable).values({
			id: userId,
			email,
			username,
			hashedPassword,
		}).returning({ id: userTable.id })

		const ip = getRequestHeader(event, "x-forwarded-for") || ""

		const session = await lucia.createSession(userId, { ip })
		appendHeader(
			event,
			"Set-Cookie",
			lucia.createSessionCookie(session.id).serialize(),
		)

		// eslint-disable-next-line no-console
		console.info("[INFO] [Auth:Signup] User signed up", { id: userId })
	}
	catch (error) {
		if (error instanceof Error) {
			const uniqueConstraintErrors = {
				email: "Email already exists",
				username: "Username already exists",
			}

			for (const [field, message] of Object.entries(uniqueConstraintErrors)) {
				if (error.message.includes("unique constraint") && error.message.includes(field)) {
					throw createError({
						status: 400,
						message,
					})
				}
			}
		}

		console.error("[Error] [Auth:Signup] Error signing up user", { error })

		// Generic error for all other cases
		throw createError({
			status: 500,
			message: "An error occurred during signup",
		})
	}
})
