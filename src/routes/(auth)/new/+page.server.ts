import * as v from 'valibot'
import { strict } from "assert/strict";
import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export const load: PageServerLoad = async ({ locals }) => {
    strict(typeof locals.user !== 'undefined');
    return {
        user: locals.user
    };
};

export const actions: Actions = {
    default: async ({ fetch, request, locals }) => {
        const data = await request.formData();
        const lenderId = data.get('lenderId');
        const borrower = data.get('borrower');
        const amountOwed = data.get('amountOwed');
        const description = data.get('description');
        
        const user = locals.user;
        if (typeof user === 'undefined')
            error(401, 'Not Authorized');
        const response = await fetch('/api/v1/tabs', {
            method: 'POST',
            body: JSON.stringify({
                lenderId,
                borrowerName: borrower,
                amountOwed,
                description
            })
        })

        const { newId } = v.parse(v.object({ newId: v.string() }), await response.json());
        redirect(303, resolve('/t/[id]', { id: newId }))
    }
};