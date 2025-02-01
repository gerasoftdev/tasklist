import { describe, it, expect } from 'vitest';
import { Route } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import common from '@repo/translation/en/common.json';
import { useMemo, type FC } from 'react';
import type { Task } from '@repo/types';
import {
  fireEvent,
  render,
  usePopulateTasks,
  waitFor,
} from '@/utils/testUtils';
import { mockTask, mockTaskName, updatedTaskName } from '@/__fixtures__/task';
import { ROUTES } from '@/constants/routes';
import { useMockTaskApi } from '@/hooks/mockTaskApi';
import { EditTask } from '@/routes/auth/features/EditTask';

const EditTaskWithPopulatedTasks: FC<{ task: Task | null }> = ({ task }) => {
  const { getTaskById } = useMockTaskApi();
  const taskFromApi = getTaskById(mockTask._id);
  const tasks = useMemo(() => (task ? [task] : []), [task]);
  usePopulateTasks(tasks);

  if (task && !taskFromApi) return <>No task yet</>;

  return (
    <Route path={ROUTES.TASKS({ taskId: ':taskId' })}>
      <EditTask />
    </Route>
  );
};

const mockEditTaskPath = ROUTES.TASKS({ taskId: ':taskId' });
const mockEditTaskLocation = ROUTES.TASKS({ taskId: mockTask._id });
const mockTasksLocation = ROUTES.TASKS();

const setup = (
  location?: ReturnType<typeof memoryLocation>,
  task: Task | null = mockTask,
) =>
  render(<EditTaskWithPopulatedTasks task={task} />, {
    location,
    path: mockEditTaskPath,
  });

describe('Edit task', () => {
  it(`If no task is found, it redirects to task list view`, async () => {
    const location = memoryLocation({
      path: mockEditTaskLocation,
      record: true,
    });
    setup(location, null);

    await waitFor(() =>
      expect(location.history[location.history.length - 1]).toBe(
        mockTasksLocation,
      ),
    );
  });
  it(`If task is found, edit the form appears`, () => {
    const location = memoryLocation({
      path: mockEditTaskLocation,
      record: true,
    });
    const screen = setup(location);

    const deleteButton = screen.getByRole('button', { name: common.delete });
    const saveButton = screen.getByRole('button', { name: common.save });
    const cancelButton = screen.getByRole('button', { name: common.cancel });
    const nameInput = screen.getByLabelText(common.name);

    expect(deleteButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });
  it(`Pressing the cancel button redirects to task list view`, async () => {
    const location = memoryLocation({
      path: mockEditTaskLocation,
      record: true,
    });
    const screen = setup(location);

    const cancelButton = screen.getByRole('button', { name: common.cancel });
    fireEvent.click(cancelButton);

    await waitFor(() =>
      expect(location.history[location.history.length - 1]).toBe(
        mockTasksLocation,
      ),
    );
  });
  it(`The default value of the name input is the name of the task`, () => {
    const location = memoryLocation({
      path: mockEditTaskLocation,
      record: true,
    });
    const screen = setup(location);

    const nameInput = screen.getByLabelText(common.name);
    expect(nameInput).toHaveValue(mockTaskName);
  });
  it(`Upon editing the form, submit becomes enabled, submitting redirects to task list view`, async () => {
    const location = memoryLocation({
      path: mockEditTaskLocation,
      record: true,
    });
    const screen = setup(location);

    const saveButton = screen.getByRole('button', { name: common.save });
    expect(saveButton).toBeDisabled();

    const nameInput = screen.getByLabelText(common.name);
    fireEvent.change(nameInput, { target: { value: updatedTaskName } });

    await waitFor(() => expect(saveButton).toBeEnabled());
    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(location.history[location.history.length - 1]).toBe(
        mockTasksLocation,
      ),
    );
  });
  it(`Pressing the delete button brings up confirmation dialog`, async () => {
    const location = memoryLocation({
      path: mockEditTaskLocation,
      record: true,
    });
    const screen = setup(location);

    const deleteButton = screen.getByRole('button', { name: common.delete });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          `Are you sure you want to delete ${mockTask.name}? This action is irreversible.`,
        ),
      ).toBeInTheDocument();
    });
  });
});
