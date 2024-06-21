import { z } from 'zod';

export const InvoiceScalarFieldEnumSchema = z.enum([
  'id',
  'customerId',
  'amount',
  'status',
  'date',
  'createdAt',
  'updatedAt',
]);

export default InvoiceScalarFieldEnumSchema;
