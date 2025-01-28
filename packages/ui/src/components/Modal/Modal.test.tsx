import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from '@/components/Modal';

const mockOnClose = vi.fn();

const defaultProps = {
  onClose: mockOnClose,
};

describe('Modal', () => {
  it('Closes the modal upon pressing overlay', () => {
    const screen = render(<Modal {...defaultProps} />);

    fireEvent.click(screen.getByTestId('overlay'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  it('Shows the close button by default', () => {
    const screen = render(<Modal {...defaultProps} />);

    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });
  it('Hides the close button if hideCloseButton is turned off', () => {
    const { queryByLabelText } = render(
      <Modal {...defaultProps} hideCloseButton />,
    );

    expect(queryByLabelText('Close')).not.toBeInTheDocument();
  });
  it('Closes the modal upon pressing the close button', () => {
    const screen = render(<Modal {...defaultProps} />);

    fireEvent.click(screen.getByLabelText('Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
