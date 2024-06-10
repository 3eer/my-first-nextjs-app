import { Customer } from '@prisma/client';
import { fetchCustomers } from '@/app/lib/data';

export async function GET() {
  const data: Customer[] = await fetchCustomers();
  return Response.json(data);
}
