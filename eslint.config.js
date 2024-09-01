import antfu from "@antfu/eslint-config"

export default antfu({
	stylistic: {
		indent: "tab", // 4, or 'tab'
		quotes: "double", // or 'double'
	},

	typescript: true,
	vue: true,

	jsonc: true,

	formatters: {
		css: true,
		html: true,
		markdown: "prettier",
	},
})
