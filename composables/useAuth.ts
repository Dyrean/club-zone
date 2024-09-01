import type { User } from "lucia"

export function useAuth() {
	const user = useState<User | null>("user", () => null)

	async function signup(
		email: string,
		username: string,
		password: string,
		confirm: string,
	) {
		return $fetch("/api/auth/signup", {
			method: "POST",
			body: {
				email,
				username,
				password,
				confirm,
			},
		}).then(() => {
			navigateTo("/login")
		})
	}

	async function login(email: string, password: string) {
		return $fetch("/api/auth/login", {
			method: "POST",
			body: {
				email,
				password,
			},
		}).then(() => {
			navigateTo("/")
		})
	}

	async function logout() {
		await $fetch("/api/auth/logout", { method: "POST" }).finally(() => {
			navigateTo("/login")
		})
	}

	return {
		user,
		signup,
		login,
		logout,
	}
}
