import type { Meta, StoryObj } from '@storybook/react';
import { Card as CardComponent } from '@/app/components/organisms/Card';

const meta = {
  title: 'Organisms/Card',
  component: CardComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    iconType: {
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
} satisfies Meta<typeof CardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    title: 'タイトル',
    value: '100,000',
    iconType: 'user_group',
  },
};
