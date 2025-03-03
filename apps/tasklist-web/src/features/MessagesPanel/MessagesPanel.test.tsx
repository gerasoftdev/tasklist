import type { Mock } from 'vitest';
import { describe, expect, it, vi } from 'vitest';
import { act, type FC } from 'react';
import { useLocation } from 'wouter';
import {
  render,
  fireEvent,
  waitFor,
  usePopulateMessages,
} from '@/utils/testUtils';
import type { MessageInput } from '@/hooks/useMessageStore';
import { useMessageStore } from '@/hooks/useMessageStore';
import { mockErrorMessageInput } from '@/__fixtures__/message';
import { MessagesPanel } from '.';

const MessagesPanelWithMessages: FC<{ messages: MessageInput[] }> = ({
  messages: messagesInput,
}) => {
  const { messages } = useMessageStore();

  usePopulateMessages(messagesInput);

  if (messagesInput.length && !messages.length) return <>No messages yet</>;

  return <MessagesPanel />;
};
const setup = (messages: MessageInput[]) =>
  render(<MessagesPanelWithMessages messages={messages} />);

vi.mock('wouter', async () => {
  const actual = await vi.importActual('wouter');
  return {
    ...actual,
    useLocation: vi.fn().mockReturnValue(['', vi.fn()]),
  };
});

describe('MessagesPanel', () => {
  it('Renders nothing when there are no messages', () => {
    const screen = setup([]);
    expect(screen.container.firstChild).toBeNull();
  });

  it('Displays messages from the store, and a clear button', () => {
    const screen = setup([mockErrorMessageInput]);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('Clears messages when the clear button is clicked', async () => {
    const screen = setup([mockErrorMessageInput]);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Clear'));

    await waitFor(() => expect(screen.queryByText('Error')).toBeNull());
  });

  it('Navigates when a message with href is clicked and verifies the URL', () => {
    const navigateMock = vi.fn();
    (useLocation as Mock).mockReturnValue(['', navigateMock]);

    const screen = setup([
      {
        ...mockErrorMessageInput,
        href: '/new-page',
      },
    ]);

    fireEvent.click(screen.getByText('Error'));
    expect(navigateMock).toHaveBeenCalledWith('/new-page');
  });

  it('Removes a message', () => {
    const screen = setup([mockErrorMessageInput]);

    expect(screen.getByText('Error')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close'));

    expect(screen.queryByText('Error')).toBeNull();
  });

  it('removes messages automatically after expireIn duration', () => {
    const duration = 3000;

    vi.useFakeTimers();

    const screen = setup([{ ...mockErrorMessageInput, expireIn: duration }]);

    const message = screen.getByText('Error');
    expect(message).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(duration);
    });
    expect(message).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
