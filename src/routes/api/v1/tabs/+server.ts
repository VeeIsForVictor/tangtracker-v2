import { createInsertSchema } from 'drizzle-valibot';
import type { RequestHandler } from './$types';
import { debt } from '$lib/server/db/schema';
import { parse, pick, ValiError } from 'valibot';
import { error, json } from '@sveltejs/kit';

const NewTabRequest = pick(createInsertSchema(debt), [
	'lenderId',
	'borrowerId',
	'borrowerName',
	'amountOwned',
	'description'
]);

export const POST: RequestHandler = async ({ locals, request }) => {
	const db = locals.db;
	let newTabRequest;
	try {
		newTabRequest = parse(NewTabRequest, await request.json());
	} catch (e) {
		const err = e as ValiError<typeof NewTabRequest>;
		return error(400, { message: err.message });
	}

	const result = await db
		.insert(debt)
		.values({
			status: 'pending_adoption',
			...newTabRequest
		})
		.returning({ insertedId: debt.id });

	const [{ insertedId }, ...rest] = result;

	if (rest.length !== 0) return error(500, 'Something went wrong');

	return json({ newId: insertedId });
};
