import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { InputProps } from '@/components/Input';
import { Input } from '@/components/Input';

const defaultProps: InputProps = {
  id: '0',
  value: '',
  onChange: () => void 0,
};

const label = 'Label';
const note = 'Note';
const error = 'Error';

describe('Input', () => {
  it('Shows label if provided', () => {
    const screen = render(<Input {...defaultProps} label={label} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });
  it('Does not show label if not provided', () => {
    const screen = render(<Input {...defaultProps} />);

    expect(screen.queryByText(label)).not.toBeInTheDocument();
  });

  it('Shows note if provided', () => {
    const screen = render(<Input {...defaultProps} note={note} />);

    expect(screen.getByText(note)).toBeInTheDocument();
  });
  it('Does not show note if not provided', () => {
    const screen = render(<Input {...defaultProps} />);

    expect(screen.queryByText(note)).not.toBeInTheDocument();
  });

  it('Shows error if provided', () => {
    const screen = render(<Input {...defaultProps} error={error} />);

    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('Shows error over note if both are provided', () => {
    const screen = render(
      <Input {...defaultProps} error={error} note={note} />,
    );

    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.queryByText(note)).not.toBeInTheDocument();
  });
  it('Shows note if error and note is provided but hideError is set', () => {
    const screen = render(
      <Input {...defaultProps} error={error} hideError note={note} />,
    );

    expect(screen.queryByText(error)).not.toBeInTheDocument();
    expect(screen.getByText(note)).toBeInTheDocument();
  });

  it('Does not show error if not provided', () => {
    const screen = render(<Input {...defaultProps} />);

    expect(screen.queryByText(error)).not.toBeInTheDocument();
  });

  it('Does not show error even if provided if hideError is set', () => {
    const screen = render(<Input {...defaultProps} error={error} hideError />);

    expect(screen.queryByText(error)).not.toBeInTheDocument();
  });
});
