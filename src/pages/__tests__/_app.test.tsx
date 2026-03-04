import React from 'react';
import { render } from '@testing-library/react';
import App from '../_app';
import type { AppProps } from 'next/app';

// Mock the toaster component since it's not the focus of this test
jest.mock('@/components/ui/toaster', () => ({
  Toaster: () => <div data-testid="toaster-mock" />
}));

// Mock next/script
jest.mock('next/script', () => ({
  __esModule: true,
  default: (props: any) => <script data-testid="next-script-mock" {...props} />
}));

describe('App Component', () => {
  const MockComponent = () => <div data-testid="mock-component">Mock Component Content</div>;
  const mockPageProps = { testProp: 'test' };

  const appProps = {
    Component: MockComponent,
    pageProps: mockPageProps,
    router: {} as any,
  } as AppProps;

  let originalGetComputedStyle: typeof window.getComputedStyle;

  beforeAll(() => {
    originalGetComputedStyle = window.getComputedStyle;
  });

  afterAll(() => {
    window.getComputedStyle = originalGetComputedStyle;
  });

  beforeEach(() => {
    // Clear any previously set classes on the documentElement
    document.documentElement.className = '';
  });

  it('renders Component, Toaster and Script after mounting', () => {
    // Mock getComputedStyle to return 'light' theme
    window.getComputedStyle = jest.fn().mockReturnValue({
      getPropertyValue: (prop: string) => prop === '--mode' ? '"light"' : ''
    }) as any;

    const { getByTestId } = render(<App {...appProps} />);

    expect(getByTestId('mock-component')).toBeInTheDocument();
    expect(getByTestId('toaster-mock')).toBeInTheDocument();
    expect(getByTestId('next-script-mock')).toBeInTheDocument();
  });

  it('adds "light" class to documentElement when computed color-scheme is light', () => {
    window.getComputedStyle = jest.fn().mockReturnValue({
      getPropertyValue: (prop: string) => prop === '--mode' ? '"light"' : ''
    }) as any;

    render(<App {...appProps} />);

    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('adds "dark" class to documentElement when computed color-scheme is dark', () => {
    window.getComputedStyle = jest.fn().mockReturnValue({
      getPropertyValue: (prop: string) => prop === '--mode' ? '"dark"' : ''
    }) as any;

    render(<App {...appProps} />);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('handles empty quotes in --mode value', () => {
    window.getComputedStyle = jest.fn().mockReturnValue({
      getPropertyValue: (prop: string) => prop === '--mode' ? 'dark' : '' // no quotes
    }) as any;

    render(<App {...appProps} />);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('handles spaces in --mode value', () => {
    window.getComputedStyle = jest.fn().mockReturnValue({
      getPropertyValue: (prop: string) => prop === '--mode' ? '  "dark"  ' : ''
    }) as any;

    render(<App {...appProps} />);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
