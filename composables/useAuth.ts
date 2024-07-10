import type { User } from "lucia"

export function useAuth() {
	const user = useState<User | null>("user", () => null)

	async function signup(
		email: string,
		password: string,
		username?: string,
		role?: "user" | "admin",
	) {
		try {
			await $fetch("/api/auth/signup", {
				method: "POST",
				body: {
					email,
					password,
					username,
					role,
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
			reloadNuxtApp()
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
