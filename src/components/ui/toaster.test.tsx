import { render } from '@testing-library/react';
import { Toaster } from './toaster';

describe('Toaster', () => {
  it('renders nothing (null)', () => {
    const { container } = render(<Toaster />);
    expect(container.firstChild).toBeNull();
  });
});
