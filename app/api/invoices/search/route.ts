import { fetchFilteredInvoices } from '@/app/lib/data';
import {
  InvoiceWithCustomer,
  InvoiceSearchParams,
} from '@/app/lib/definitions';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET(
  req: NextRequest,
  { query, currentPage }: InvoiceSearchParams,
) {
  const data: InvoiceWithCustomer[] = await fetchFilteredInvoices(
    query,
    currentPage,
  );
  return Response.json(data);
}
