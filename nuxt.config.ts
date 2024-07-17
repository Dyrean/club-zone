// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },

	nitro: {
		experimental: {
			websocket: true,
		},
	},

	modules: [
		"@nuxtjs/tailwindcss",
		"shadcn-nuxt",
		"@pinia/nuxt",
		"@vueuse/nuxt",
		"@formkit/auto-animate",
		"nuxt-lucide-icons",
		"nuxt-security",
	],

	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: "",
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: "./components/ui",
	},
})
