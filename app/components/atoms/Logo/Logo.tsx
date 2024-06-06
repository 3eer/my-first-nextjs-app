import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
      data-testid="logo"
    >
      <GlobeAltIcon
        className="h-10 w-10 rotate-[15deg]"
        data-testid="globe-alt-icon-inside-logo"
      />
      <p className="text-[25px]">Nextjs App</p>
    </div>
  );
}
