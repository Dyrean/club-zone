import { Argon2id } from "oslo/password"
import { userTable } from "~/server/db/schema"
import { generateRandomID } from "~/server/utils/id"
import { SignupSchema } from "~/types/auth"

export default defineEventHandler(async (event) => {
	const { email, password, username } = await readValidatedBody(event, body => SignupSchema.parse(body))

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
	}
	catch {
		throw createError({
			status: 400,
			message: "Username already exists",
		})
	}
})
