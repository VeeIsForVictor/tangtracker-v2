import { pgTable, text, uuid, varchar, decimal, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth.schema';

const debtStatus = pgEnum('debt_status', [
	'pending_adoption',
	'unpaid',
	'payment_pending',
	'settled'
])

export const debt = pgTable('debt', {
	id: uuid('id').defaultRandom().primaryKey(),
	shareToken: varchar('share_token'),
	lenderId: text('lender_id').references(() => user.id),
	borrowerName: varchar('borrower_name'),
	borrowerId: text('borrower_id').references(() => user.id),
	amountOwned: decimal('amount_owned', { precision: 10, scale: 2 }),
	description: text('description'),
	status: debtStatus().notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export * from './auth.schema';
