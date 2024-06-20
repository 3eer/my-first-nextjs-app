import { z } from 'zod';
import type { InvoiceWithRelations } from './InvoiceSchema'
import { InvoiceWithRelationsSchema } from './InvoiceSchema'

/////////////////////////////////////////
// CUSTOMER SCHEMA
/////////////////////////////////////////

export const CustomerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  imageUrl: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Customer = z.infer<typeof CustomerSchema>

/////////////////////////////////////////
// CUSTOMER RELATION SCHEMA
/////////////////////////////////////////

export type CustomerRelations = {
  invoices: InvoiceWithRelations[];
};

export type CustomerWithRelations = z.infer<typeof CustomerSchema> & CustomerRelations

export const CustomerWithRelationsSchema: z.ZodType<CustomerWithRelations> = CustomerSchema.merge(z.object({
  invoices: z.lazy(() => InvoiceWithRelationsSchema).array(),
}))

export default CustomerSchema;
