import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Route } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import { EditTask } from '@/routes/auth/features/EditTask';
import { usePopulateTasks } from '@/utils/testUtils';
import { mockTask } from '@/__fixtures__/task';
import { ROUTES } from '@/constants/routes';
import { useMockTaskApi } from '@/hooks/mockTaskApi';

type Args = ComponentProps<typeof EditTask>;

const tasks = [mockTask];
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
      const { getTaskById } = useMockTaskApi();
      const task = getTaskById(mockTask._id);
      usePopulateTasks(tasks);

      if (!task) return <>No task yet</>;

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

export const Default: Story = {};
