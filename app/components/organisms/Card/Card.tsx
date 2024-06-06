import { Icon, IconType } from '@/app/components/atoms/Icon';
import { lusitana } from '@/app/ui/fonts';

type CardProps = {
  title: string;
  value: number | string;
  iconType: IconType;
};

export default function Card({ title, value, iconType }: CardProps) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <Icon type={iconType} className="h-5 w-5 text-gray-700" />
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>

      <p
        className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
