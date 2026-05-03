<script lang="ts">
	import type { PaymentMethods } from '$lib/schemas/payment-methods';

    const { data } = $props();

    let { user } = $derived(data);

    const paymentMethods = $derived(user.paymentMethods as PaymentMethods)
</script>

<div class="flex flex-col items-center bg-slate-600/30 p-8 rounded-2xl gap-y-4">
    <div class="flex flex-col items-center">
        <h1 class="text-xl">{user.name}</h1>
        <h3 class="text-md">{user.email}</h3>
    </div>

    <h3 class="text-shadow-md underline">Payment Methods</h3>

    <div class="grid grid-cols-2 gap-4">
        {#each paymentMethods as { provider, contact } (provider)}
            <div class="bg-slate-600/20 p-4 rounded-xl">
                <h4>{provider}</h4>
                <p>{contact}</p>
            </div>
        {/each}
        <div class="bg-slate-600/20 p-4 rounded-xl">
            <h4>New thingy</h4>
            <p>Contact</p>
        </div>
    </div>
</div>