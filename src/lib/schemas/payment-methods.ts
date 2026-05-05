import { array, object, picklist, string, type InferOutput } from 'valibot';

export const PaymentProvider = picklist(['Maya', 'GCash']);

export const PaymentMethod = object({
	provider: PaymentProvider,
	contact: string()
});

export const PaymentMethods = array(PaymentMethod);

export type PaymentMethod = InferOutput<typeof PaymentMethod>;
export type PaymentMethods = InferOutput<typeof PaymentMethods>;
