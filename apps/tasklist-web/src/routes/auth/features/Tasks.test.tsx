import { describe, it, expect } from 'vitest';
import { Route } from 'wouter';
import taskTranslation from '@repo/translation/en/task.json';
import { memoryLocation } from 'wouter/memory-location';
import type { MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@/utils/testUtils';
import { ROUTES } from '@/constants/routes';
import { Tasks } from '@/routes/auth/features/Tasks';
import { mockTask, mockTaskName } from '@/__fixtures__/task';
import {
  getTasksQuery,
  updateTaskCompletedMutation,
} from '@/routes/auth/features/mockQueries';

const setup = (
  mocks: MockedResponse[] = [],
  location?: ReturnType<typeof memoryLocation>,
) =>
  render(
    <Route path={ROUTES.TASKS({ taskId: '*?' })}>
      <Tasks />
    </Route>,
    { mocks, location, path: '/' },
  );

describe('Tasks', () => {
  it(`Shows spinner when task is loading`, () => {
    const screen = setup([
      getTasksQuery({
        withLoading: true,
        loadingFor: Infinity,
      }),
    ]);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
  it(`Shows task name and checkbox indicating whether or not it's been completed`, async () => {
    const screen = setup([getTasksQuery()]);
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    const name = screen.getByRole('link', { name: mockTaskName });
    const checkbox = screen.getByRole('checkbox', {
      name: taskTranslation.completed,
    });

    expect(name).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });
  it(`Shows add task input`, async () => {
    const screen = setup([getTasksQuery()]);
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    expect(
      screen.getByPlaceholderText(taskTranslation.newTask),
    ).toBeInTheDocument();
  });
  it(`Ticking the checkbox updates the task, marking it completed, unticking it marks it as uncompleted`, async () => {
    const screen = setup([
      getTasksQuery(),
      updateTaskCompletedMutation(true),
      updateTaskCompletedMutation(false),
    ]);
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    const checkbox = screen.getByRole('checkbox', {
      name: taskTranslation.completed,
    });

    expect(checkbox).not.toBeChecked();
    expect(checkbox).toBeEnabled();

    fireEvent.click(checkbox);

    await waitFor(() => expect(checkbox).toBeDisabled());
    await waitFor(() => expect(checkbox).toBeEnabled());
    await waitFor(() => expect(checkbox).toBeChecked());
    expect(checkbox).toBeEnabled();

    fireEvent.click(checkbox);

    await waitFor(() => expect(checkbox).toBeDisabled());
    await waitFor(() => expect(checkbox).toBeEnabled());
    await waitFor(() => expect(checkbox).not.toBeChecked());
  });
  it(`Pressing the task redirects to the edit page`, async () => {
    const location = memoryLocation({
      path: ROUTES.TASKS(),
      record: true,
    });
    const screen = setup([getTasksQuery()], location);

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    const name = screen.getByRole('link', { name: mockTaskName });
    fireEvent.click(name);

    expect(location.history[location.history.length - 1]).toBe(
      ROUTES.TASKS({ taskId: mockTask._id }),
    );
  });
});
