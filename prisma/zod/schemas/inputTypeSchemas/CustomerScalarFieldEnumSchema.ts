import { z } from 'zod';

export const CustomerScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'email',
  'imageUrl',
  'createdAt',
  'updatedAt',
]);

export default CustomerScalarFieldEnumSchema;
