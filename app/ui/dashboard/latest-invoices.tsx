import { Icon } from '@/app/components/atoms/Icon';
import { lusitana } from '@/app/ui/fonts';
import { InvoiceWithCustomer } from '@/app/lib/definitions';
import { fetchLatestInvoices } from '@/app/lib/data';
import { InvoiceTableRow } from '@/app/components/molecuels/InvoiceTableRow';

export default async function LatestInvoices() {
  const latestInvoices: InvoiceWithCustomer[] = await fetchLatestInvoices();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, index) => {
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
