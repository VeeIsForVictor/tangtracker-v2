<script lang="ts">
	import type { ResolvedPathname } from '$app/types';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		disabled?: boolean;
		display?: 'filled' | 'outline';
		className?: ClassValue;
		type?: 'button' | 'submit';
		href?: ResolvedPathname;
		children: Snippet;
	}

	const {
		disabled = $bindable(false),
		href = undefined,
		className = '',
		type = 'button',
		display,
		children
	}: Props = $props();

	let setClass: ClassValue = $state(
		'block flex flex-row items-center justify-center gap-x-2 p-2 w-full rounded-lg'
	);

	$effect(() => {
		switch (display) {
			case 'filled':
				setClass = cn(setClass, 'bg-white text-black');
				break;
			case 'outline':
				setClass = cn(setClass, 'bg-none border-gray-200 border-2 text-white');
				break;
		}
	});
</script>

{#if typeof href !== 'undefined'}
	<a {href} class={cn(setClass, className)}>
		{@render children()}
	</a>
{:else}
	<button {type} {disabled} class={cn(setClass, className)}>
		{@render children()}
	</button>
{/if}
