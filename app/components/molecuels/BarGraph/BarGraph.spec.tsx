import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BarGraph, BarGraphDataRowInterface } from './BarGraph';

describe('BarGraph component', () => {
  const data: BarGraphDataRowInterface[] = [
    { label: '202108', value: 1500 },
    { label: '202109', value: 3000 },
    { label: '202110', value: 4500 },
  ];

  it('should render y-axis labels correctly', () => {
    render(<BarGraph data={data} />);

    const yAxisLabels = ['5K', '4K', '3K', '2K', '1K', '0K'];
    yAxisLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('should render bars with correct heights', () => {
    render(<BarGraph data={data} />);

    const bars = screen.getAllByTestId('graph-bar');
    const heights = [105, 210, 315];

    bars.forEach((bar, index) => {
      const expectedHeight = heights[index];
      const actualHeight = parseFloat(bar.style.height);
      expect(Math.abs(actualHeight - expectedHeight)).toBeLessThan(0.1);
    });
  });

  it('should render labels correctly', () => {
    render(<BarGraph data={data} />);

    const labels = ['08', '09', '10'];
    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
