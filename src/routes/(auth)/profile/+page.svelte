<script lang="ts">
	import type { PaymentMethods } from '$lib/schemas/payment-methods';

	const { data } = $props();

	let { user } = $derived(data);

	const paymentMethods = $derived(user.paymentMethods as PaymentMethods);
</script>

<div class="flex flex-col items-center gap-y-4 rounded-2xl bg-slate-600/30 p-8">
	<div class="flex flex-col items-center">
		<h1 class="text-xl">{user.name}</h1>
		<h3 class="text-md">{user.email}</h3>
	</div>

	<h3 class="underline text-shadow-md">Payment Methods</h3>

	<div class="grid grid-cols-2 gap-4">
		{#each paymentMethods as { provider, contact } (provider)}
			<div class="rounded-xl bg-slate-600/20 p-4">
				<h4>{provider}</h4>
				<p>{contact}</p>
			</div>
		{/each}
		<div class="rounded-xl bg-slate-600/20 p-4">
			<h4>New thingy</h4>
			<p>Contact</p>
		</div>
	</div>
</div>
