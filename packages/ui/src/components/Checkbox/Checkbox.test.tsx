import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { CheckboxProps } from '@/components/Checkbox';
import { Checkbox } from '@/components/Checkbox';

const defaultProps: CheckboxProps = {
  id: '0',
  checked: false,
  onChange: () => void 0,
};

const label = 'Label';
const note = 'Note';
const error = 'Error';

describe('Checkbox', () => {
  it('Shows label if provided', () => {
    const screen = render(<Checkbox {...defaultProps} label={label} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });
  it('Does not show label if not provided', () => {
    const screen = render(<Checkbox {...defaultProps} />);

    expect(screen.queryByText(label)).not.toBeInTheDocument();
  });

  it('Shows note if provided', () => {
    const screen = render(<Checkbox {...defaultProps} note={note} />);

    expect(screen.getByText(note)).toBeInTheDocument();
  });
  it('Does not show note if not provided', () => {
    const screen = render(<Checkbox {...defaultProps} />);

    expect(screen.queryByText(note)).not.toBeInTheDocument();
  });

  it('Shows error over note if both are provided, and hideError is off', () => {
    const screen = render(
      <Checkbox
        {...defaultProps}
        error={error}
        hideError={false}
        note={note}
      />,
    );

    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.queryByText(note)).not.toBeInTheDocument();
  });
  it('Shows note if error and note is provided but hideError is set', () => {
    const screen = render(
      <Checkbox {...defaultProps} error={error} hideError note={note} />,
    );

    expect(screen.queryByText(error)).not.toBeInTheDocument();
    expect(screen.getByText(note)).toBeInTheDocument();
  });

  it('Does not show error even if provided by default', () => {
    const screen = render(<Checkbox {...defaultProps} error={error} />);

    expect(screen.queryByText(error)).not.toBeInTheDocument();
  });
  it('Shows error if provided, and hideError is off', () => {
    const screen = render(
      <Checkbox {...defaultProps} error={error} hideError={false} />,
    );

    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
