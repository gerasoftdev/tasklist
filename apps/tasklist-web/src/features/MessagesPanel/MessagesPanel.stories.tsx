import type { Meta, StoryObj } from '@storybook/react';
import { MessagesPanel } from '@/features/MessagesPanel';
import type { MessageInput } from '@/hooks/useMessageStore';
import {
  mockErrorMessageInput,
  mockInfoMessageInput,
  mockSuccessMessageInput,
  mockWarningMessageInput,
} from '@/__fixtures__/message';
import { usePopulateMessages } from '@/utils/testUtils';

type Args = {
  messages: MessageInput[];
};

const meta: Meta<Args> = {
  title: 'MessagesPanel',
  component: MessagesPanel,
  args: {
    messages: [
      mockInfoMessageInput,
      mockErrorMessageInput,
      mockWarningMessageInput,
      mockSuccessMessageInput,
      { expireIn: 2000, ...mockSuccessMessageInput },
    ],
  },
  decorators: [
    (Story, { args }) => {
      usePopulateMessages(args.messages);

      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
