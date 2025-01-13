import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '@/components/Button';
import { Text } from '@/components/typography/Text';

const label = 'Label';

describe('Button', () => {
  it('Shows children', () => {
    const screen = render(
      <Button>
        <Text>{label}</Text>
      </Button>,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
