import { eq } from "drizzle-orm"
import { Argon2id } from "oslo/password"
import { ZodError } from "zod"
import type { H3Event } from "h3"
import { userTable } from "~/server/db/schema"
import { LoginSchema } from "~/types/auth"

export default defineEventHandler(async (event: H3Event) => {
	const { email, password } = await readValidatedBody(event, body => LoginSchema.parseAsync(body).catch((error) => {
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

	const user = await db
		.select()
		.from(userTable)
		.where(eq(userTable.email, email))
		.get()

	if (!user) {
		throw createError({
			status: 401,
			message: "Invalid email or password",
		})
	}

	const passwordIsValid = await new Argon2id().verify(
		user.hashedPassword,
		password,
	)

	if (!passwordIsValid) {
		throw createError({
			status: 401,
			message: "Invalid email or password",
		})
	}

	// eslint-disable-next-line no-console
	console.info("[INFO] [Auth:Login] User logged in", { id: user.id })

	const ip = getRequestHeader(event, "x-forwarded-for") || ""

	const session = await lucia.createSession(user.id, { ip })
	appendHeader(
		event,
		"Set-Cookie",
		lucia.createSessionCookie(session.id).serialize(),
	)

	await lucia.deleteExpiredSessions()
})
