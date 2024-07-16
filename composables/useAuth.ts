import type { User } from "lucia"

export function useAuth() {
	const user = useState<User | null>("user", () => null)

	async function signup(
		email: string,
		username: string,
		password: string,
		confirm: string,
	) {
		try {
			await $fetch("/api/auth/signup", {
				method: "POST",
				body: {
					email,
					username,
					password,
					confirm,
				},
			})

			await navigateTo("/")
		}
		catch {
			console.error("Signup Error")
		}
	}

	async function login(email: string, password: string) {
		try {
			await $fetch("/api/auth/login", {
				method: "POST",
				body: {
					email,
					password,
				},
			})

			await navigateTo("/")
		}
		catch {
			console.error("Login Error")
		}
	}

	async function logout() {
		try {
			await $fetch("/api/auth/logout", { method: "POST" })
			await navigateTo("/login")
		}
		catch {
			console.error("Logout Error")
		}
	}

	return {
		user,
		signup,
		login,
		logout,
	}
}
