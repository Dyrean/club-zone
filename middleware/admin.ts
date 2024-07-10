export default defineNuxtRouteMiddleware(async () => {
	const { user } = useAuth()

	if (user.value?.role !== "admin") {
		return navigateTo("/")
	}
})
