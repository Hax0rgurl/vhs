import React from 'react';
import { render, screen } from '@testing-library/react';
import MyChart from '../components/MyChart';

// Polyfill ResizeObserver for recharts
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock recharts because it uses ResizeObserver which is not supported in JSDOM
// JSDOM has zero width/height layout by default, which causes the ResponsiveContainer
// to render nothing. We override it.
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: any) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

describe('MyChart', () => {
  let originalConsoleWarn: any;

  beforeAll(() => {
    // Suppress console warnings from recharts regarding width/height in JSDOM
    originalConsoleWarn = console.warn;
    console.warn = jest.fn((...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('The width(0) and height(0) of chart should be greater than 0') ||
         args[0].includes('maybe you don\'t need to use a ResponsiveContainer'))
      ) {
        return;
      }
      originalConsoleWarn(...args);
    });
  });

  afterAll(() => {
    console.warn = originalConsoleWarn;
  });

  it('renders the chart container', () => {
    const { container } = render(<MyChart />);

    // The chart component should be rendered
    const chartContainer = container.querySelector('.recharts-responsive-container');
    expect(chartContainer).toBeInTheDocument();
  });

  it('renders chart data points (e.g. Page A, Page B)', () => {
    render(<MyChart />);

    // Test for a few axis labels
    expect(screen.getByText('Page A')).toBeInTheDocument();
    expect(screen.getByText('Page B')).toBeInTheDocument();
  });
});
