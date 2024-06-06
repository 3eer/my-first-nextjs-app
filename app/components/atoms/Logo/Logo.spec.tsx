import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { lusitana } from '@/app/ui/fonts';
import Logo from './Logo';

describe('Logo component', () => {
  it('should render the GlobeAltIcon', () => {
    render(<Logo />);
    const iconElement = screen.getByTestId('globe-alt-icon-inside-logo');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('h-10 w-10 rotate-[15deg]');
  });

  it('should render the text "Nextjs App"', () => {
    render(<Logo />);
    const textElement = screen.getByText(/Nextjs App/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass('text-[25px]');
  });

  it('should apply the lusitana class to the container', () => {
    render(<Logo />);
    const containerElement = screen.getByText(/Nextjs App/i).parentElement;
    expect(containerElement).toHaveClass(
      'flex flex-row items-center leading-none text-white',
    );
    expect(containerElement).toHaveClass(lusitana.className);
  });
});
