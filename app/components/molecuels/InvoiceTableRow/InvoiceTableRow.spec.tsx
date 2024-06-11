import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvoiceTableRow from './InvoiceTableRow';
import { InvoiceWithCustomer } from '@/app/lib/definitions';
import { InvoiceStatus } from '@prisma/client';
import { formatCurrency } from '@/app/lib/utils';
import { lusitana } from '@/app/ui/fonts';

// Mocking next/image
jest.mock('next/image', () => (props: any) => {
  // return <img {...props} />;
});

// Mocking formatCurrency
jest.mock('@/app/lib/utils', () => ({
  formatCurrency: jest.fn((value) => `$${value.toFixed(2)}`),
}));

describe('InvoiceTableRow component', () => {
  const invoice: InvoiceWithCustomer = {
    id: '1',
    customerId: '1',
    customer: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      imageUrl: '/path/to/image.jpg',
      createdAt: new Date('2020-01-01 00:00:00'),
      updatedAt: new Date('2020-01-01 00:00:00'),
    },
    date: new Date('2020-01-01'),
    status: 'paid' as InvoiceStatus,
    amount: 1234,
    createdAt: new Date('2020-01-01 00:00:00'),
    updatedAt: new Date('2020-01-01 00:00:00'),
  };

  it('should render customer image, name, email, and formatted amount', () => {
    render(<InvoiceTableRow invoice={invoice} index={0} />);

    // Check customer image
    const image = screen.getByAltText(
      `${invoice.customer.name}'s profile picture`,
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', invoice.customer.imageUrl);
    expect(image).toHaveClass('mr-4 rounded-full');

    // Check customer name
    const name = screen.getByText(invoice.customer.name);
    expect(name).toBeInTheDocument();
    expect(name).toHaveClass('truncate text-sm font-semibold md:text-base');

    // Check customer email
    const email = screen.getByText(invoice.customer.email);
    expect(email).toBeInTheDocument();
    expect(email).toHaveClass('hidden text-sm text-gray-500 sm:block');

    // Check formatted amount
    const amount = screen.getByText(formatCurrency(invoice.amount));
    expect(amount).toBeInTheDocument();
    expect(amount).toHaveClass(
      `${lusitana.className} truncate text-sm font-medium md:text-base`,
    );
  });

  it('should add border-top class if index is not 0', () => {
    const { container } = render(
      <InvoiceTableRow invoice={invoice} index={1} />,
    );
    expect(container.firstChild).toHaveClass('border-t');
  });

  it('should not add border-top class if index is 0', () => {
    const { container } = render(
      <InvoiceTableRow invoice={invoice} index={0} />,
    );
    expect(container.firstChild).not.toHaveClass('border-t');
  });
});
