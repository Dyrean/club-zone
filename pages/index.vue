<script setup lang="ts">
definePageMeta({
	middleware: ["protected"],
})
const { user, logout } = useAuth()
</script>

<template>
	<div>
		<h1 class="text-2xl text-gray-500 mt-8">
			Welcome, {{ user!.username }}
		</h1>
		<p>Your user ID is {{ user!.id }}.</p>
		<form @submit.prevent="logout">
			<Button>Logout</Button>
		</form>
	</div>
</template>
