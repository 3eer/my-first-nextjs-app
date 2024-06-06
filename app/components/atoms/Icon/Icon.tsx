import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  PowerIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ArrowPathIcon,
  CalendarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const iconComponentMap = {
  home: HomeIcon,
  banknotes: BanknotesIcon,
  document_duplicate: DocumentDuplicateIcon,
  user_group: UserGroupIcon,
  clock: ClockIcon,
  inbox: InboxIcon,
  power: PowerIcon,
  arrow_path: ArrowPathIcon,
  calendar: CalendarIcon,
  arrow_right: ArrowRightIcon,
};

type IconProps = {
  type: IconType;
  className: string;
};

export type IconType =
  | 'home'
  | 'banknotes'
  | 'document_duplicate'
  | 'user_group'
  | 'clock'
  | 'inbox'
  | 'power'
  | 'arrow_path'
  | 'calendar'
  | 'arrow_right';

export function Icon({ type, className }: IconProps) {
  const IconComponent = iconComponentMap[type];
  if (!IconComponent) return null;

  return <IconComponent className={className} data-testid={type} />;
}
