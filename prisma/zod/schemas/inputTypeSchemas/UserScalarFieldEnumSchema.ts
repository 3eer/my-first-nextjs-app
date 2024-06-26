import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'email',
  'password',
  'createdAt',
  'updatedAt',
]);

export default UserScalarFieldEnumSchema;
