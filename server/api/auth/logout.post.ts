import type { H3Event } from "h3"

export default defineEventHandler(async (event: H3Event) => {
	const lucia = useLucia()

	if (!event.context.session) {
		throw createError({
			statusCode: 403,
		})
	}

	await lucia.invalidateSession(event.context.session.id)
	appendHeader(
		event,
		"Set-Cookie",
		lucia.createBlankSessionCookie().serialize(),
	)

	// eslint-disable-next-line no-console
	console.info("[INFO] [Auth:Logout] User logged out", { id: event.context.user?.id })
})
