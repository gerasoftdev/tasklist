import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '@/components/Button';

const label = 'Label';

describe('Button Components', () => {
  it('Renders Button with label', () => {
    const screen = render(<Button label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('Renders custom children', () => {
    const screen = render(
      <Button>
        <span>Custom</span>
      </Button>,
    );
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('Renders Button with icon elements', () => {
    const screen = render(
      <Button IconLeft={<span>Left</span>} IconRight={<span>Right</span>} />,
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });
});
