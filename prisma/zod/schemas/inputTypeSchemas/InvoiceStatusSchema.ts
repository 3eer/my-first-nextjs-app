import { z } from 'zod';

export const InvoiceStatusSchema = z.enum(['Pending', 'Paid']);

export type InvoiceStatusType = `${z.infer<typeof InvoiceStatusSchema>}`;

export default InvoiceStatusSchema;
