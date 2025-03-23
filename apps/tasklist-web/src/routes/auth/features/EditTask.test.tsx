import { describe, it, expect } from 'vitest';
import { memoryLocation } from 'wouter/memory-location';
import common from '@repo/translation/en/common.json';
import type { MockedResponse } from '@apollo/client/testing';
import { Route } from 'wouter';
import { fireEvent, render, waitFor } from '@/utils/testUtils';
import { mockTask, mockTaskName, updatedTaskName } from '@/__fixtures__/task';
import { ROUTES } from '@/constants/routes';
import { EditTask } from '@/routes/auth/features/EditTask';
import {
  getTaskQuery,
  updateTaskNameMutation,
} from '@/routes/auth/features/mockQueries';

const mockEditTaskPath = ROUTES.TASKS({ taskId: ':taskId' });
const mockEditTaskLocation = ROUTES.TASKS({ taskId: mockTask._id });
const mockTasksLocation = ROUTES.TASKS();

const setup = (
  mocks: MockedResponse[] = [],
  location?: ReturnType<typeof memoryLocation>,
) =>
  render(
    <Route path={mockEditTaskPath}>
      <EditTask />
    </Route>,
    { mocks, location, path: mockEditTaskLocation },
  );

describe('Edit task', () => {
  it(`Shows spinner when task is loading`, () => {
    const screen = setup([
      getTaskQuery({
        loadingFor: Infinity,
      }),
    ]);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
  it(`If no task is found, it redirects to task list view`, async () => {
    const location = memoryLocation({
      path: mockEditTaskLocation,
      record: true,
    });
    const screen = setup(
      [
        getTaskQuery({
          withLoading: true,
          result: {
            getTaskById: null,
          },
        }),
      ],
      location,
    );

    expect(location.history[location.history.length - 1]).toBe(
      mockEditTaskLocation,
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(location.history[location.history.length - 1]).toBe(
        mockTasksLocation,
      ),
    );
  });
  it(`If task is found, edit the form appears`, async () => {
    const location = memoryLocation({
      path: mockEditTaskLocation,
      record: true,
    });
    const screen = setup([getTaskQuery()], location);

    await waitFor(() =>
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
    );

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
    const screen = setup([getTaskQuery()], location);

    await waitFor(() =>
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
    );

    const cancelButton = screen.getByRole('button', { name: common.cancel });
    fireEvent.click(cancelButton);

    await waitFor(() =>
      expect(location.history[location.history.length - 1]).toBe(
        mockTasksLocation,
      ),
    );
  });
  it(`The default value of the name input is the name of the task`, async () => {
    const location = memoryLocation({
      path: mockEditTaskLocation,
      record: true,
    });
    const screen = setup([getTaskQuery()], location);

    await waitFor(() =>
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
    );

    const nameInput = screen.getByLabelText(common.name);
    expect(nameInput).toHaveValue(mockTaskName);
  });
  it(`Upon editing the form, submit becomes enabled, submitting redirects to task list view`, async () => {
    const location = memoryLocation({
      path: mockEditTaskLocation,
      record: true,
    });
    const screen = setup([getTaskQuery(), updateTaskNameMutation()], location);

    await waitFor(() =>
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
    );
    const saveButton = screen.getByRole('button', { name: common.save });
    expect(saveButton).toBeDisabled();

    const nameInput = screen.getByLabelText(common.name);
    fireEvent.change(nameInput, { target: { value: updatedTaskName } });

    await waitFor(() => expect(saveButton).toBeEnabled());
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(saveButton).toBeDisabled();
      expect(nameInput).toBeDisabled();
    });

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
    const screen = setup([getTaskQuery(), updateTaskNameMutation()], location);

    await waitFor(() =>
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
    );
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
