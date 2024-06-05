import { Icon } from '@/app/components/atoms/Icon';
import { BarGraph, BarGraphDataRowInterface } from '@/app/components/molecuels/BarGraph';
import { lusitana } from '@/app/ui/fonts';
import { fetchMonthlyRevenue } from '@/app/lib/data';
import { Revenue } from '@prisma/client';

export default async function RevenueChart() {
  const monthlyRevenue: Revenue[] = await fetchMonthlyRevenue();
  if (!monthlyRevenue || monthlyRevenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  const data: BarGraphDataRowInterface[] = monthlyRevenue.map((row) => {
    return {
      label: row.month,
      value: row.revenue,
    };
  });

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <BarGraph data={data} />
        <div className="flex items-center pb-2 pt-6">
          <Icon type="calendar" className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
