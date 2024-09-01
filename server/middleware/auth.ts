import { verifyRequestOrigin } from "lucia"
import type { Session, User } from "lucia"
import type { H3Event } from "h3"

export default defineEventHandler(async (event: H3Event) => {
	const lucia = useLucia()
	if (event.node.req.method !== "GET") {
		const originHeader = getHeader(event, "Origin") ?? null
		const hostHeader = getHeader(event, "Host") ?? null
		if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
			return event.node.res.writeHead(403).end()
		}
	}

	const sessionId = getCookie(event, lucia.sessionCookieName) ?? null
	if (!sessionId) {
		event.context.session = null
		event.context.user = null
		return
	}

	try {
		const { session, user } = await lucia.validateSession(sessionId)
		if (session && session.fresh) {
			appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize())
		}
		if (!session) {
			appendHeader(event, "Set-Cookie", lucia.createBlankSessionCookie().serialize())
		}
		event.context.session = session
		event.context.user = user
	}
	catch (error) {
		console.error("[Error] [Auth:Middleware] Error validating session", { error })
		event.context.session = null
		event.context.user = null
		appendHeader(event, "Set-Cookie", lucia.createBlankSessionCookie().serialize())
	}
})

declare module "h3" {
	interface H3EventContext {
		user: User | null
		session: Session | null
	}
}
