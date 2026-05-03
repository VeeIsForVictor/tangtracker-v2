<script>
	import Button from '$lib/components/Button.svelte';
</script>

<div class="flex flex-col items-center gap-y-2 text-center">
	<h1 class="text-3xl">Welcome to <span class="underline">TangTracker</span></h1>
	<p>Utang, tracked!</p>
	<div class="mt-8 flex flex-col items-center gap-y-4">
		<Button display="filled" href="/login">Login</Button>
		<Button display="outline" href="/register">Register</Button>
	</div>
</div>
