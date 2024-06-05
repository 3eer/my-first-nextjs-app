import type { Meta, StoryObj } from '@storybook/react';
import { Logo as LogoComponent } from '@/app/components/atoms/Logo';

const meta = {
  title: 'Atoms/Logo',
  component: LogoComponent,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'blue',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LogoComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Logo: Story = {};
