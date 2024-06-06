import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '@/app/components/atoms/Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: [
        'home',
        'banknotes',
        'document_duplicate',
        'user_group',
        'clock',
        'inbox',
        'power',
        'arrow_path',
        'calendar',
        'arrow_right',
      ],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeIcon: Story = {
  args: {
    type: 'home',
    className: 'h-20 w-20 text-gray-700',
  },
};

export const BanknotesIcon: Story = {
  args: {
    type: 'banknotes',
    className: 'h-20 w-20 text-gray-700',
  },
};

export const DocumentDuplicateIcon: Story = {
  args: {
    type: 'document_duplicate',
    className: 'h-20 w-20 text-gray-700',
  },
};

export const UserGroupIcon: Story = {
  args: {
    type: 'user_group',
    className: 'h-20 w-20 text-gray-700',
  },
};

export const ClockIcon: Story = {
  args: {
    type: 'clock',
    className: 'h-20 w-20 text-gray-700',
  },
};

export const InboxIcon: Story = {
  args: {
    type: 'inbox',
    className: 'h-20 w-20 text-gray-700',
  },
};

export const PowerIcon: Story = {
  args: {
    type: 'power',
    className: 'h-20 w-20 text-gray-700',
  },
};

export const ArrowPathIcon: Story = {
  args: {
    type: 'arrow_path',
    className: 'h-20 w-20 text-gray-700',
  },
};

export const CalendarIcon: Story = {
  args: {
    type: 'calendar',
    className: 'h-20 w-20 text-gray-700',
  },
};
