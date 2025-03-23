import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Route } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import { EditTask } from '@/routes/auth/features/EditTask';
import { mockTask } from '@/__fixtures__/task';
import { ROUTES } from '@/constants/routes';
import { getTaskQuery } from '@/routes/auth/features/mockQueries';

type Args = ComponentProps<typeof EditTask>;

const meta: Meta<Args> = {
  title: 'EditTask',
  parameters: {
    path: ROUTES.TASKS({ taskId: ':taskId' }),
    location: memoryLocation({
      path: ROUTES.TASKS({ taskId: mockTask._id }),
      static: true,
    }),
  },
  decorators: [
    (Story) => {
      return (
        <Route path={ROUTES.TASKS({ taskId: ':taskId' })}>
          <Story />
        </Route>
      );
    },
  ],
  component: EditTask,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  parameters: {
    apolloClient: {
      mocks: [getTaskQuery()],
    },
  },
};

export const Loading: Story = {
  parameters: {
    apolloClient: {
      mocks: [
        getTaskQuery({
          loadingFor: Infinity,
        }),
      ],
    },
  },
};
