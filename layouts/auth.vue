<script lang="ts" setup>

</script>

<template>
	<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
		<div class="flex items-center justify-center py-12">
			<div class="mx-auto grid w-[350px] gap-6">
				<slot />
			</div>
		</div>
		<div class="hidden bg-muted lg:block">
			<img
				src="~/assets/placeholder.svg"
				alt="Image"
				class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
			>
		</div>
	</div>
</template>
