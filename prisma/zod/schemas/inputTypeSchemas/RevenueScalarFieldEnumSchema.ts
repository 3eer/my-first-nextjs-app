import { z } from 'zod';

export const RevenueScalarFieldEnumSchema = z.enum(['id','userId','month','revenue','createdAt','updatedAt']);

export default RevenueScalarFieldEnumSchema;
