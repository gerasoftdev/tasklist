import { describe, it, expect } from 'vitest';
import { Route } from 'wouter';
import taskTranslation from '@repo/translation/en/task.json';
import { memoryLocation } from 'wouter/memory-location';
import {
  fireEvent,
  render,
  usePopulateTasks,
  waitFor,
} from '@/utils/testUtils';
import { ROUTES } from '@/constants/routes';
import { Tasks } from '@/routes/auth/features/Tasks';
import { mockTask, mockTaskName } from '@/__fixtures__/task';

const TasksWithPopulatedTasks = () => {
  usePopulateTasks([mockTask]);

  return <Tasks />;
};

const setup = (location?: ReturnType<typeof memoryLocation>) =>
  render(
    <Route path={ROUTES.TASKS({ taskId: '*?' })}>
      <TasksWithPopulatedTasks />
    </Route>,
    { location },
  );

describe('Tasks', () => {
  it(`Shows task name and checkbox indicating whether or not it's been completed`, () => {
    const screen = setup();

    const name = screen.getByRole('link', { name: mockTaskName });
    const checkbox = screen.getByRole('checkbox', {
      name: taskTranslation.completed,
    });

    expect(name).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });
  it(`Ticking the checkbox updates the task, marking it completed, unticking it marks it as uncompleted`, async () => {
    const screen = setup();
    const checkbox = screen.getByRole('checkbox', {
      name: taskTranslation.completed,
    });

    expect(checkbox).not.toBeChecked();
    expect(checkbox).toBeEnabled();

    fireEvent.click(checkbox);

    await waitFor(() => expect(checkbox).toBeChecked());
    expect(checkbox).toBeEnabled();

    fireEvent.click(checkbox);

    await waitFor(() => expect(checkbox).not.toBeChecked());
  });
  it(`Pressing the task redirects to the edit page`, () => {
    const location = memoryLocation({
      path: ROUTES.TASKS(),
      record: true,
    });
    const screen = setup(location);

    const name = screen.getByRole('link', { name: mockTaskName });
    fireEvent.click(name);

    expect(location.history[location.history.length - 1]).toBe(
      ROUTES.TASKS({ taskId: mockTask._id }),
    );
  });
});
