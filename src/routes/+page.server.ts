import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { resolve } from "$app/paths";

export const load: PageServerLoad = async ({ parent }) => {
    const { isLoggedIn } = await parent();
    if (isLoggedIn) redirect(308, resolve('/(auth)/profile'));
};