<script lang="ts">
    const { data } = $props();

    let { user } = $derived(data);
</script>

<div class="flex flex-col items-center bg-slate-600/30 p-8 rounded-2xl">
    <h1 class="text-xl">{user.name}</h1>
    <h3 class="text-md">{user.email}</h3>

    
</div>