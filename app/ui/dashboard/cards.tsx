import { fetchCardData } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';
import { Card } from '@/app/components/organisms/Card';

export async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <Card
        title="Collected"
        value={formatCurrency(totalPaidInvoices)}
        iconType="banknotes"
      />
      <Card
        title="Pending"
        value={formatCurrency(totalPendingInvoices)}
        iconType="clock"
      />
      <Card title="Total Invoices" value={numberOfInvoices} iconType="inbox" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        iconType="user_group"
      />
    </>
  );
}
