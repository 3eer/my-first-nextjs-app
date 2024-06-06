import { fetchLatestInvoices } from '@/app/lib/data';
import { InvoiceWithCustomer } from '@/app/lib/definitions';

export async function GET() {
  const data: InvoiceWithCustomer[] = await fetchLatestInvoices();
  return Response.json(data);
}
