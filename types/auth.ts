import { z } from "zod"

export const SignupSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	username: z.string().min(2, { message: "Username must be at least 2 characters long" }),
	password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
	confirm: z.string().min(8, { message: "Password must be at least 8 characters long" }),
	role: z.enum(["user", "admin"]),
}).refine(data => data.password === data.confirm, {
	message: "Passwords don't match",
	path: ["confirm"], // path of error
})

export const LoginSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})
