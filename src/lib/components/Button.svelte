<script lang="ts">
	import type { ResolvedPathname } from '$app/types';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		disabled?: boolean
		display?: 'filled' | 'outline';
		className?: ClassValue;
		type?: 'button' | 'submit';
		href?: ResolvedPathname;
		children: Snippet;
	}

	const { disabled = $bindable(false), href = undefined, className = '', type = 'button', display, children }: Props = $props();

	let setClass: ClassValue = $state('');

	$effect(() => {
		switch (display) {
			case 'filled':
				setClass = 'p-2 w-full rounded-lg bg-white text-black';
				break;
			case 'outline':
				setClass = 'p-2 w-full rounded-lg bg-none border-gray-200 border-2';
				break;
		}
	});
</script>

{#if typeof href !== 'undefined'}
	<a {href} class={cn(className, setClass)}>
		{@render children()}
	</a>
{:else}
	<button {type} {disabled} class={cn(className, setClass)}>
		{@render children()}
	</button>
{/if}
