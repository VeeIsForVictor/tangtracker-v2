import strict from 'assert/strict';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	strict(typeof locals.user !== 'undefined');

	return {
		user: locals.user
	};
};
