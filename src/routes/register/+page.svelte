<script lang="ts">
    import * as v from 'valibot';
	import { createForm } from "@tanstack/svelte-form";
	import Button from '$lib/components/Button.svelte';

    const form = createForm(() => ({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: () => {
            
        }
    }))
</script>

<div class="flex flex-col items-center text-center">
	<h1 class="text-3xl">Make a new account</h1>
	<p>Start tracking right away!</p>
    <form
        class="mt-8 p-4 rounded-xl flex flex-col items-center gap-y-4 bg-slate-900/40 w-md"
        onsubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}
    >
        <form.Field 
            name="email"
            validators={{
                onChange: v.pipe(v.string(), v.email('Must be a valid email'))
            }}
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
                onChange: v.pipe(
                    v.string(), 
                    v.minLength(8, 'Must be at least 8 characters'),
                )
            }}
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
                {#if field.state.meta.errors.length != 0}
                    <div class="h-8 text-sm">
                        {#each field.state.meta.errors as error (error?.message)}
                            <p class="text-red-600">{error?.message}</p>
                        {/each}
                    </div>
                {/if}
            {/snippet}
        </form.Field>
        <Button display="filled" type="submit">Register</Button>
    </form>
</div>
