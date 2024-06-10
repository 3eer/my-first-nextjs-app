import { fetchFilteredInvoices } from '@/app/lib/data';
import { InvoiceWithCustomer, InvoiceSearchParams } from '@/app/lib/definitions';

export async function GET(query: string, currentPage: number) {
  const data: InvoiceWithCustomer[] = await fetchFilteredInvoices(query, currentPage);
  return Response.json(data);
}
