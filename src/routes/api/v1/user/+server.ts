import { createUpdateSchema } from 'drizzle-valibot'
import { auth } from '$lib/server/auth.js'
import { error, json, type RequestHandler } from '@sveltejs/kit'
import { user } from '$lib/server/db/auth.schema.js'
import { parseAsync, pick, ValiError } from 'valibot'

const UpdateUserSchema = pick(
    createUpdateSchema(user),
    ['name', 'image', 'paymentMethods']
)

export const GET: RequestHandler = async ({ locals }) => {
    if (typeof locals.session === 'undefined')
        error(401)
    return json({
        user: locals.user
    })
}

export const PATCH: RequestHandler = async ({ locals, request }) => {
    if (typeof locals.session === 'undefined')
        error(401)
    let updateRequest;
    try {
        updateRequest = await parseAsync(UpdateUserSchema, request.json());
    } catch (e: unknown) {
        const err = e as ValiError<typeof UpdateUserSchema>
        return error(400, {message: err.message})
    }
    const { status } = await auth.api.updateUser({
        body: {
            name: updateRequest.name,
            image: updateRequest.image,
            paymentMethods: updateRequest.paymentMethods as Record<string, string>[]
        }
    })
    
    if (status) 
        return json({})
    else
        return error(500)
}