import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/svelte';
import type { auth } from './server/auth';

export const authClient = createAuthClient({
	baseURL: 'http://localhost:5173',
	plugins: [inferAdditionalFields<typeof auth>()]
});

export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user;
