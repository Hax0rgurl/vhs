import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import MyChart from './MyChart';

// Mock recharts because it uses ResizeObserver which jsdom doesn't support by default,
// and it's complex to render fully in jsdom. We just want to ensure our component
// renders the Recharts components with the correct props.
vi.mock('recharts', async () => {
  const OriginalRechartsModule = await vi.importActual('recharts');
  return {
    ...OriginalRechartsModule,
    ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
    LineChart: ({ children, data }: any) => <div data-testid="line-chart" data-data={JSON.stringify(data)}>{children}</div>,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    XAxis: ({ dataKey }: any) => <div data-testid="x-axis" data-datakey={dataKey} />,
    YAxis: () => <div data-testid="y-axis" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
    Line: ({ type, dataKey, stroke }: any) => (
      <div data-testid="line" data-type={type} data-datakey={dataKey} data-stroke={stroke} />
    ),
  };
});

describe('MyChart', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the chart container with correct styles', () => {
    const { container } = render(<MyChart />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle({ width: '100%', height: '300px' });
  });

  it('renders ResponsiveContainer and LineChart', () => {
    render(<MyChart />);
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('passes correct data to LineChart', () => {
    render(<MyChart />);
    const lineChart = screen.getByTestId('line-chart');
    const data = JSON.parse(lineChart.getAttribute('data-data') || '[]');

    expect(data.length).toBe(7);
    expect(data[0]).toEqual({ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 });
    expect(data[6]).toEqual({ name: 'Page G', uv: 3490, pv: 4300, amt: 2100 });
  });

  it('renders all required chart sub-components', () => {
    render(<MyChart />);
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('legend')).toBeInTheDocument();
  });

  it('renders two Line components with correct props', () => {
    render(<MyChart />);
    const lines = screen.getAllByTestId('line');
    expect(lines).toHaveLength(2);

    // First line (pv)
    expect(lines[0]).toHaveAttribute('data-type', 'monotone');
    expect(lines[0]).toHaveAttribute('data-datakey', 'pv');
    expect(lines[0]).toHaveAttribute('data-stroke', '#8884d8');

    // Second line (uv)
    expect(lines[1]).toHaveAttribute('data-type', 'monotone');
    expect(lines[1]).toHaveAttribute('data-datakey', 'uv');
    expect(lines[1]).toHaveAttribute('data-stroke', '#82ca9d');
  });

  it('configures XAxis with correct dataKey', () => {
    render(<MyChart />);
    const xAxis = screen.getByTestId('x-axis');
    expect(xAxis).toHaveAttribute('data-datakey', 'name');
  });
});
