<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { vAutoAnimate } from "@formkit/auto-animate/vue"
import { LoginSchema } from "~/types/auth"
import { useToast } from "@/components/ui/toast/use-toast"

definePageMeta({
	layout: "auth",
})

const formSchema = toTypedSchema(LoginSchema)

const { handleSubmit } = useForm({
	validationSchema: formSchema,
})

const { login } = useAuth()
const { toast } = useToast()

const onSubmit = handleSubmit(async (values) => {
	await login(values.email, values.password).then(() => {
		toast({
			title: "Login successful",
			description: "Welcome back!",
			duration: 3000,
		})
	}).catch((error) => {
		const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
		toast({
			title: "Login failed",
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
			Login
		</h1>
		<p class="text-balance text-muted-foreground">
			Enter your email below to login to your account
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
		<FormField v-slot="{ componentField }" name="password" class="grid gap-2">
			<FormItem v-auto-animate>
				<FormLabel>Password</FormLabel>
				<FormControl>
					<Input type="password" v-bind="componentField" />
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<Button type="submit" class="w-full">
			Login
		</Button>
		<div class="mt-4 text-center text-sm">
			Don't have an account?
			<a href="/signup" class="underline">
				Sign up
			</a>
		</div>
	</form>
</template>
