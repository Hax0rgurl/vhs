import React from 'react';
import { render, screen } from '@testing-library/react';
import MyChart from '../components/MyChart';

jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: any) => <div data-testid="ResponsiveContainer">{children}</div>,
    LineChart: ({ children, data }: any) => (
      <div data-testid="LineChart" data-count={data ? data.length : 0}>
        {children}
      </div>
    ),
    Line: (props: any) => <div data-testid="Line" data-datakey={props.dataKey} />,
    XAxis: (props: any) => <div data-testid="XAxis" data-datakey={props.dataKey} />,
    YAxis: () => <div data-testid="YAxis" />,
    CartesianGrid: () => <div data-testid="CartesianGrid" />,
    Tooltip: () => <div data-testid="Tooltip" />,
    Legend: () => <div data-testid="Legend" />,
  };
});

describe('MyChart', () => {
  it('renders the chart with correct components', () => {
    render(<MyChart />);

    expect(screen.getByTestId('ResponsiveContainer')).toBeInTheDocument();

    const lineChart = screen.getByTestId('LineChart');
    expect(lineChart).toBeInTheDocument();
    expect(lineChart).toHaveAttribute('data-count', '7'); // There are 7 data points in the mocked data

    expect(screen.getByTestId('CartesianGrid')).toBeInTheDocument();
    expect(screen.getByTestId('XAxis')).toHaveAttribute('data-datakey', 'name');
    expect(screen.getByTestId('YAxis')).toBeInTheDocument();
    expect(screen.getByTestId('Tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('Legend')).toBeInTheDocument();

    const lines = screen.getAllByTestId('Line');
    expect(lines).toHaveLength(2);
    expect(lines[0]).toHaveAttribute('data-datakey', 'pv');
    expect(lines[1]).toHaveAttribute('data-datakey', 'uv');
  });
});
