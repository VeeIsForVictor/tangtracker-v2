<script>
	import Button from "$lib/components/Button.svelte";

</script>
<div class="flex flex-col items-center text-center gap-y-2">
    <h1 class="text-3xl">Welcome to <span class="underline">TangTracker</span></h1>
    <p>Utang, tracked!</p>
    <div class="flex flex-col items-center mt-8 gap-y-4">
        <Button display="filled" href="/login">
            Login
        </Button>
        <button class="p-2 w-full rounded-lg bg-white text-black" type="button">Login</button>
        <button class="p-2 w-full rounded-lg bg-none border-gray-200 border-2" type="button">Register</button>
    </div>
</div>
