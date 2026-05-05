<script lang="ts">
	import 'iconify-icon';
	import { createForm } from '@tanstack/svelte-form';
	import Button from '$lib/components/Button.svelte';
	import { authClient } from '$lib/auth-client';

	let isAuthPending = $state(false);
	let authError: { message?: string | undefined } | undefined = $state();

	const form = createForm(() => ({
		defaultValues: {
			email: '',
			password: ''
		},
		onSubmit: async ({ value: { email, password } }) => {
			isAuthPending = true;
			const { error } = await authClient.signIn.email({
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
	<h1 class="text-3xl">Welcome back!</h1>
	<p>Login to your Account</p>
	<form
		class="flex flex-col items-center gap-y-4 rounded-xl bg-slate-900/60 p-4"
		onsubmit={(e) => {
			e.preventDefault();
			e.stopPropagation();
			form.handleSubmit();
		}}
	>
		<form.Field name="email">
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
			{/snippet}
		</form.Field>
		<form.Field name="password">
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
			{/snippet}
		</form.Field>
		<Button display="filled" type="submit" bind:disabled={isAuthPending}>
			{#if isAuthPending}
				<iconify-icon icon="svg-spinners:blocks-shuffle-2" width="24" height="24"></iconify-icon>
			{/if}
			Login
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
