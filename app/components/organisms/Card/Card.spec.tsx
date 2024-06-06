import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import { IconType } from '@/app/components/atoms/Icon';
import { lusitana } from '@/app/ui/fonts';

jest.mock('@/app/components/atoms/Icon', () => ({
  Icon: (props: any) => <div data-testid="icon" {...props}></div>,
  IconType: jest.requireActual('@/app/components/atoms/Icon').IconType,
}));

describe('Card component', () => {
  const title = 'Test Title';
  const value = '12345';
  const iconType: IconType = 'home';

  it('should render the icon, title, and value', () => {
    render(<Card title={title} value={value} iconType={iconType} />);

    // Check icon
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('h-5 w-5 text-gray-700');

    // Check title
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('ml-2 text-sm font-medium');

    // Check value
    const valueElement = screen.getByText(value);
    expect(valueElement).toBeInTheDocument();
    expect(valueElement).toHaveClass(
      `${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`,
    );
  });
});
