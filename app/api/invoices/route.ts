import { fetchLatestInvoices } from '@/app/lib/data';
import { InvoiceWithCustomer } from '@/app/lib/definitions';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const data: InvoiceWithCustomer[] = await fetchLatestInvoices();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch the latest invoices:', error);
    throw error;
  }
}
