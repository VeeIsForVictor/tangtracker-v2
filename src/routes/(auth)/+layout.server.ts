import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { resolve } from "$app/paths";

export const load: LayoutServerLoad = async ({ locals }) => {
    if (typeof locals.user === 'undefined')
        redirect(302, resolve('/login'))
};