import { ORIGIN } from "$env/static/private"
import { createAuthClient } from "better-auth/svelte"

export const authClient = createAuthClient({
    baseURL: ORIGIN
})