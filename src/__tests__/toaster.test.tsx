import { render } from '@testing-library/react';
import { Toaster } from '../components/ui/toaster';
import React from 'react';

describe('Toaster', () => {
  it('renders null', () => {
    const { container } = render(<Toaster />);
    expect(container.firstChild).toBeNull();
  });
});
