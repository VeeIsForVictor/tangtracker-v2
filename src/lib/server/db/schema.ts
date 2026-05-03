import { pgTable, text, uuid, varchar, decimal, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth.schema';

const debtStatus = pgEnum('debt_status', [
	'pending_adoption',
	'unpaid',
	'payment_pending',
	'settled'
]);

export const debt = pgTable('debt', {
	id: uuid('id').defaultRandom().primaryKey(),
	shareToken: varchar('share_token'),
	lenderId: text('lender_id').references(() => user.id),
	borrowerName: varchar('borrower_name'),
	borrowerId: text('borrower_id').references(() => user.id),
	amountOwned: decimal('amount_owned', { precision: 10, scale: 2 }),
	description: text('description'),
	status: debtStatus('status').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
});

const systemEvent = pgEnum('system_event', [
	'debt_created',
	'debt_adopted',
	'marked_as_paid',
	'confirmed',
	'disputed',
	'cancelled'
]);

export const message = pgTable('message', {
	id: uuid('id').defaultRandom().primaryKey(),
	debtId: uuid('debt_id')
		.references(() => debt.id)
		.notNull(),
	senderId: uuid('sender_id').references(() => user.id),
	systemEvent: systemEvent('system_event'),
	content: text('content'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
});

export * from './auth.schema';
