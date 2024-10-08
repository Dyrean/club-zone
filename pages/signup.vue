<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { vAutoAnimate } from "@formkit/auto-animate/vue"
import { SignupSchema } from "~/types/auth"
import { useToast } from "@/components/ui/toast/use-toast"

definePageMeta({
	layout: "auth",
})

const formSchema = toTypedSchema(SignupSchema)

const { handleSubmit } = useForm({
	validationSchema: formSchema,
})

const { signup } = useAuth()
const { toast } = useToast()

const onSubmit = handleSubmit(async (values) => {
	await signup(values.email, values.username, values.password, values.confirm).then(() => {
		toast({
			title: "Signup successful",
			description: "Welcome to the club!",
			duration: 3000,
		})
	}).catch((error) => {
		console.error("Signup Error:", error)
		const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
		toast({
			title: "Signup failed",
			description: errorMessage,
			variant: "destructive",
			duration: 3000,
		})
	})
})
</script>

<template>
	<div class="grid gap-2 text-center">
		<h1 class="text-3xl font-bold">
			Sign Up
		</h1>
		<p class="text-balance text-muted-foreground">
			Enter your information to create an account
		</p>
	</div>
	<form class="grid gap-4" @submit="onSubmit">
		<FormField v-slot="{ componentField }" name="email" class="grid gap-2">
			<FormItem v-auto-animate>
				<FormLabel>Email</FormLabel>
				<FormControl>
					<Input type="email" v-bind="componentField" />
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="username" class="grid gap-2">
			<FormItem v-auto-animate>
				<FormLabel>Username</FormLabel>
				<FormControl>
					<Input type="text" v-bind="componentField" />
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="password" class="grid gap-2">
			<FormItem v-auto-animate>
				<FormLabel>Password</FormLabel>
				<FormControl>
					<Input type="password" v-bind="componentField" />
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="confirm" class="grid gap-2">
			<FormItem v-auto-animate>
				<FormLabel>Confirm Password</FormLabel>
				<FormControl>
					<Input type="password" v-bind="componentField" />
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<Button type="submit" class="w-full">
			Create an account
		</Button>
		<div class="mt-4 text-center text-sm">
			Already have an account?
			<a href="/login" class="underline">
				Login
			</a>
		</div>
	</form>
</template>
