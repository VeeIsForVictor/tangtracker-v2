<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Background from '$lib/components/Background.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Background />

<div class="m-auto flex h-dvh flex-col items-center justify-center">
	{@render children()}
</div>

