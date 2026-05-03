<script lang="ts">
    import "iconify-icon";
	import { createForm } from "@tanstack/svelte-form";
	import Button from '$lib/components/Button.svelte';
	import { authClient } from '$lib/auth-client';

    let isAuthPending = $state(false);
    let authError: { message?: string | undefined } | undefined = $state()

    const form = createForm(() => ({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ value: { email, password } }) => {
            isAuthPending = true;
            const { error } = await authClient.signIn.email({
                email,
                password
            })
            isAuthPending = false;
            if (error) {
                authError = error
            }
        }
    }))
</script>

<div class="flex flex-col items-center text-center gap-y-6">
	<h1 class="text-3xl">Welcome back!</h1>
	<p>Login to your Account</p>
    <form
        class="p-4 rounded-xl flex flex-col items-center gap-y-4 bg-slate-900/60"
        onsubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}
    >
        <form.Field 
            name="email"
        >
            {#snippet children(field)}
                <div class="flex flex-row items-center gap-x-2 w-full">
                    <label for={field.name}>Email:</label>
                    <input
                        class="bg-gray-800/20 rounded-lg p-1 w-full"
                        name={field.name}
                        value={field.state.value}
                        onblur={field.handleBlur}
                        oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
                    />
                </div>
            {/snippet}
        </form.Field>
        <form.Field 
            name="password"
        >
            {#snippet children(field)}
                <div class="flex flex-row items-center gap-x-2 w-full">
                    <label for={field.name}>Password:</label>
                    <input
                        class="bg-gray-800/20 rounded-lg p-1 w-full"
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
        <div class="w-full p-5 rounded-2xl border-red-900 border-2 bg-red-800/40 text-red-400 text-center">
            <p>!! {authError.message} !!</p>
        </div>
    {/if}
</div>
