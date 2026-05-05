<script lang="ts">
	import * as v from 'valibot';
	import 'iconify-icon';
	import { createForm } from '@tanstack/svelte-form';
	import Button from '$lib/components/Button.svelte';
	import { authClient } from '$lib/auth-client';

	let isAuthPending = $state(false);
	let authError: { message?: string | undefined } | undefined = $state();

	const form = createForm(() => ({
		defaultValues: {
			name: '',
			email: '',
			password: ''
		},
		onSubmit: async ({ value: { name, email, password } }) => {
			isAuthPending = true;
			const { error } = await authClient.signUp.email({
				name,
				email,
				password
			});
			isAuthPending = false;
			if (error) {
				authError = error;
			}
		}
	}));
</script>

<div class="flex flex-col items-center gap-y-6 text-center">
	<h1 class="text-3xl">Make a new account</h1>
	<p>Start tracking right away!</p>
	<form
		class="flex flex-col items-center gap-y-4 rounded-xl bg-slate-900/60 p-4"
		onsubmit={(e) => {
			e.preventDefault();
			e.stopPropagation();
			form.handleSubmit();
		}}
	>
		<form.Field
			name="name"
			validators={{
				onBlur: v.string()
			}}
		>
			{#snippet children(field)}
				<div class="flex w-full flex-row items-center gap-x-2">
					<label for={field.name}>Name:</label>
					<input
						class="w-full rounded-lg bg-gray-800/20 p-1"
						name={field.name}
						value={field.state.value}
						onblur={field.handleBlur}
						oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
					/>
				</div>
				{#if field.state.meta.errors.length != 0}
					<div class="h-8 text-sm">
						{#each field.state.meta.errors as error (error?.message)}
							<p class="text-red-600">{error?.message}</p>
						{/each}
					</div>
				{/if}
			{/snippet}
		</form.Field>
		<form.Field
			name="email"
			validators={{
				onBlur: v.pipe(v.string(), v.email('Must be a valid email'))
			}}
		>
			{#snippet children(field)}
				<div class="flex w-full flex-row items-center gap-x-2">
					<label for={field.name}>Email:</label>
					<input
						class="w-full rounded-lg bg-gray-800/20 p-1"
						name={field.name}
						value={field.state.value}
						onblur={field.handleBlur}
						oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
					/>
				</div>
				{#if field.state.meta.errors.length != 0}
					<div class="h-8 text-sm">
						{#each field.state.meta.errors as error (error?.message)}
							<p class="text-red-600">{error?.message}</p>
						{/each}
					</div>
				{/if}
			{/snippet}
		</form.Field>
		<form.Field
			name="password"
			validators={{
				onBlur: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
			}}
		>
			{#snippet children(field)}
				<div class="flex w-full flex-row items-center gap-x-2">
					<label for={field.name}>Password:</label>
					<input
						class="w-full rounded-lg bg-gray-800/20 p-1"
						name={field.name}
						value={field.state.value}
						onblur={field.handleBlur}
						oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
						type="password"
					/>
				</div>
				{#if field.state.meta.errors.length != 0}
					<div class="h-8 text-sm">
						{#each field.state.meta.errors as error (error?.message)}
							<p class="text-red-600">{error?.message}</p>
						{/each}
					</div>
				{/if}
			{/snippet}
		</form.Field>
		<Button display="filled" type="submit" bind:disabled={isAuthPending}>
			{#if isAuthPending}
				<iconify-icon icon="svg-spinners:blocks-shuffle-2" width="24" height="24"></iconify-icon>
			{/if}
			Register
		</Button>
	</form>

	{#if typeof authError !== 'undefined'}
		<div
			class="w-full rounded-2xl border-2 border-red-900 bg-red-800/40 p-5 text-center text-red-400"
		>
			<p>!! {authError.message} !!</p>
		</div>
	{/if}
</div>
