import { z } from 'zod';
import { InvoiceStatusSchema } from '../inputTypeSchemas/InvoiceStatusSchema';
import type { CustomerWithRelations } from './CustomerSchema';
import { CustomerWithRelationsSchema } from './CustomerSchema';

/////////////////////////////////////////
// INVOICE SCHEMA
/////////////////////////////////////////

export const InvoiceSchema = z.object({
  status: InvoiceStatusSchema,
  id: z.string().uuid(),
  customerId: z.string(),
  amount: z.number().int(),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;

/////////////////////////////////////////
// INVOICE RELATION SCHEMA
/////////////////////////////////////////

export type InvoiceRelations = {
  customer: CustomerWithRelations;
};

export type InvoiceWithRelations = z.infer<typeof InvoiceSchema> &
  InvoiceRelations;

export const InvoiceWithRelationsSchema: z.ZodType<InvoiceWithRelations> =
  InvoiceSchema.merge(
    z.object({
      customer: z.lazy(() => CustomerWithRelationsSchema),
    }),
  );

export default InvoiceSchema;
