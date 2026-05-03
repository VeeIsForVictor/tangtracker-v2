<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";

    const form = createForm(() => ({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: () => {
            
        }
    }))
</script>

<div class="flex flex-col items-center gap-y-2 text-center">
	<h1 class="text-3xl">Make a new account</h1>
	<p>Start tracking right away!</p>
    <form
        class="mt-8 p-4 rounded-xl flex flex-col items-center gap-y-4 bg-slate-900/40"
        onsubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}
    >
        <form.Field name="email">
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
        <form.Field name="password">
            {#snippet children(field)}
                <div class="flex flex-row items-center gap-x-2 w-full">
                    <label for={field.name}>Password:</label>
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
    </form>
</div>
