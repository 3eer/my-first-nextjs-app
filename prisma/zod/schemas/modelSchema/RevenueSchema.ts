import { z } from 'zod';
import type { UserWithRelations } from './UserSchema'
import { UserWithRelationsSchema } from './UserSchema'

/////////////////////////////////////////
// REVENUE SCHEMA
/////////////////////////////////////////

export const RevenueSchema = z.object({
  id: z.number().int(),
  userId: z.string(),
  month: z.string(),
  revenue: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Revenue = z.infer<typeof RevenueSchema>

/////////////////////////////////////////
// REVENUE RELATION SCHEMA
/////////////////////////////////////////

export type RevenueRelations = {
  user: UserWithRelations;
};

export type RevenueWithRelations = z.infer<typeof RevenueSchema> & RevenueRelations

export const RevenueWithRelationsSchema: z.ZodType<RevenueWithRelations> = RevenueSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

export default RevenueSchema;
