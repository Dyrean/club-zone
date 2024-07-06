import antfu from "@antfu/eslint-config"

import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat()

export default antfu(
	{
		stylistic: {
			indent: "tab", // 4, or 'tab'
			quotes: "double", // or 'double'
		},

		typescript: true,
		vue: true,

		jsonc: true,
		yaml: true,

		formatters: {
			/**
			 * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
			 * By default uses Prettier
			 */
			css: true,
			/**
			 * Format HTML files
			 * By default uses Prettier
			 */
			html: true,
			/**
			 * Format Markdown files
			 * Supports Prettier and dprint
			 * By default uses Prettier
			 */
			markdown: "prettier",
		},
	},
	...compat.config({
		extends: ["prettier"],
	}),
)
