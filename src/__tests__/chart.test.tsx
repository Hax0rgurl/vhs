import React from 'react';
import { render, screen } from '@testing-library/react';
import ChartPage from '@/pages/chart';

// Mock next/dynamic
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (...args: any[]) => {
    // Return a dummy component for the mocked dynamic import
    return () => <div data-testid="mock-chart">Mocked Chart</div>;
  },
}));

describe('ChartPage', () => {
  it('renders the chart page heading', () => {
    render(<ChartPage />);
    expect(screen.getByText('Chart Page')).toBeInTheDocument();
  });

  it('renders the mocked chart component', () => {
    render(<ChartPage />);
    expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
  });
});
