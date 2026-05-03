<script lang="ts">
	import './layout.css';
	import "iconify-icon"
	import favicon from '$lib/assets/favicon.svg';
	import Background from '$lib/components/Background.svelte';
	import Button from '$lib/components/Button.svelte';

	let { data, children } = $props();

	const { isLoggedIn } = $derived(data);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Background />

<div class="absolute top-0">
	{#if isLoggedIn}
		<Button display="filled" href="/profile" className="m-4 p-2 size-auto">
			<iconify-icon icon="material-symbols:location-home" width="24" height="24"></iconify-icon>
		</Button>
	{/if}
</div>

<div class="m-auto max-w-sm flex h-dvh flex-col items-center justify-center text-white">
	{@render children()}
</div>
