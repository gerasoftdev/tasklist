import type { MessageInput } from '@/hooks/useMessageStore';

export const mockInfoMessageInput: MessageInput = {
  id: 'info',
  type: 'info',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const mockErrorMessageInput: MessageInput = {
  id: 'error',
  type: 'error',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
export const mockWarningMessageInput: MessageInput = {
  id: 'warning',
  type: 'warning',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
export const mockSuccessMessageInput: MessageInput = {
  id: 'success',
  type: 'success',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
