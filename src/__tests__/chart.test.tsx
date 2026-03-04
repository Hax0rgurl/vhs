import { render, screen, waitFor } from '@testing-library/react';
import ChartPage from '../pages/chart';

// Note: ResizeObserver is mocked in jest.setup.js

// Mock console.warn to suppress Recharts width/height warning in test environment
const originalConsoleWarn = console.warn;
beforeEach(() => {
  console.warn = jest.fn((...args) => {
    if (typeof args[0] === 'string' && args[0].includes('The width(0) and height(0) of chart should be greater than 0')) {
      return;
    }
    originalConsoleWarn(...args);
  });
});

afterEach(() => {
  console.warn = originalConsoleWarn;
});

describe('ChartPage', () => {
  it('renders correctly with loading state initially', async () => {
    render(<ChartPage />);

    // Check loading text and heading
    expect(screen.getByRole('heading', { name: /Chart Page/i })).toBeInTheDocument();
    expect(screen.getByText(/Loading chart\.\.\./i)).toBeInTheDocument();

    // Check that Recharts loads the responsive container
    await waitFor(() => {
      const container = document.querySelector('.recharts-responsive-container');
      expect(container).toBeInTheDocument();
    });

    // After it loads, loading text should be gone
    expect(screen.queryByText(/Loading chart\.\.\./i)).not.toBeInTheDocument();
  });
});
