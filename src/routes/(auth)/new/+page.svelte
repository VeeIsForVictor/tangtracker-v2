<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import { createForm } from '@tanstack/svelte-form';

	const { data } = $props();
	const {
		user: { id: lenderId }
	} = $derived(data);

	const form = createForm(() => ({
		defaultValues: {
			lenderId,
			borrower: '',
			amountOwed: '',
			description: ''
		}
	}));
</script>

<div class="flex flex-col space-y-8">
	<div class="flex flex-col items-center">
		<h1 class="text-3xl">New Tab</h1>
		<h5 class="text-sm">Track a new accountability</h5>
	</div>

	<form class="flex flex-col gap-y-4 rounded-xl bg-slate-900/60 p-4" method="POST" use:enhance>
		<form.Field name="borrower">
			{#snippet children(field)}
				<div class="flex flex-row items-center space-x-2">
					<label for={field.name}> Borrower: </label>
					<input name={field.name} class="w-full rounded-lg bg-gray-800/20 p-1" />
				</div>
			{/snippet}
		</form.Field>
		<form.Field name="amountOwed">
			{#snippet children(field)}
				<div class="flex flex-row items-center space-x-2">
					<label for={field.name}> Amount: </label>
					<input name={field.name} class="w-full rounded-lg bg-gray-800/20 p-1" />
				</div>
			{/snippet}
		</form.Field>
		<form.Field name="description">
			{#snippet children(field)}
				<div class="flex flex-col space-y-2">
					<label for={field.name}> Description: </label>
					<textarea name={field.name} class="w-full rounded-lg bg-gray-800/20 p-1"></textarea>
				</div>
			{/snippet}
		</form.Field>
		<Button type="submit" display="filled">Create</Button>
	</form>
</div>
