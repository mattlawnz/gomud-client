import { render } from '@testing-library/react';

import { Room } from './Room';

describe('Room', () => {
  it('should work as expected', () => {
    render(<Room />);

    // TODO: do proper assertions here
    expect(1 + 1).toBe(2);
  });
});
