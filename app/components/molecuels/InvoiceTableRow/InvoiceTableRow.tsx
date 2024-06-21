import clsx from 'clsx';
import Image from 'next/image';
import { formatCurrency } from '@/app/lib/utils';
import { lusitana } from '@/app/ui/fonts';
import { InvoiceWithCustomer } from '@/app/lib/definitions';

type dataProps = {
  invoice: InvoiceWithCustomer;
  index: number;
};

export default function InvoiceTableRow({ invoice, index }: dataProps) {
  return (
    <div
      className={clsx('flex flex-row items-center justify-between py-4', {
        'border-t': index !== 0,
      })}
    >
      <div className="flex items-center">
        <Image
          src={invoice.customer.imageUrl}
          alt={`${invoice.customer.name}'s profile picture`}
          className="mr-4 rounded-full"
          width={32}
          height={32}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold md:text-base">
            {invoice.customer.name}
          </p>
          <p className="hidden text-sm text-gray-500 sm:block">
            {invoice.customer.email}
          </p>
        </div>
      </div>
      <p
        className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
      >
        {formatCurrency(invoice.amount)}
      </p>
    </div>
  );
}
