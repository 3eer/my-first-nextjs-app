'use client';

import useSWR, { preload } from 'swr';
import { Icon } from '@/app/components/atoms/Icon';
import { lusitana } from '@/app/ui/fonts';
import { InvoiceTableRow } from '@/app/components/molecuels/InvoiceTableRow';
import { InvoiceWithCustomer } from '@/app/lib/definitions';
import { LatestInvoicesSkeleton } from '@/app/ui/skeletons';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

preload('/api/invoices', fetcher);

export default function LatestInvoices() {
  const {
    data: LatestInvoices,
    error,
    isLoading,
  } = useSWR<InvoiceWithCustomer[]>('/api/invoices', fetcher, { suspense: true });
  if (error) return <div>Failed to load invoices</div>;
  if (!LatestInvoices) return;
  if (isLoading) return <LatestInvoicesSkeleton />;

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {LatestInvoices.map((invoice, index) => {
            return (
              <InvoiceTableRow
                key={invoice.id}
                invoice={invoice}
                index={index}
              />
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <Icon type="arrow_path" className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
