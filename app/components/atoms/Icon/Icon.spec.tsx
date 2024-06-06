import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Icon, IconType } from './Icon';

describe('Icon component', () => {
  const iconTypes: IconType[] = [
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
  ];

  iconTypes.forEach((type) => {
    it(`should render ${type} icon`, () => {
      render(<Icon type={type} className="test-class" />);
      const iconElement = screen.getByTestId(type);
      expect(iconElement).toBeInTheDocument();
      expect(iconElement).toHaveClass('test-class');
    });
  });

  it('should return null for invalid icon type', () => {
    // @ts-expect-error: Invalid type for testing purposes
    render(<Icon type="invalid_type" className="test-class" />);
    const iconElement = screen.queryByTestId('invalid_type');
    expect(iconElement).toBeNull();
  });
});
