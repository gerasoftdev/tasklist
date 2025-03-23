import common from '@repo/translation/en/common.json';
import { describe, expect, it, vi } from 'vitest';
import type { MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@/utils/testUtils';
import { mockTask } from '@/__fixtures__/task';
import { DeleteTaskModal } from '@/routes/auth/features/DeleteTaskModal';
import { deleteTaskMutation } from '@/routes/auth/features/mockQueries';

const mockSubmit = vi.fn();
const mockCancel = vi.fn();

const setup = (mocks: MockedResponse[] = []) =>
  render(
    <DeleteTaskModal
      onCancel={mockCancel}
      onSubmit={mockSubmit}
      task={mockTask}
    />,
    { mocks },
  );

describe('Delete task list modal', () => {
  it(`Shows confirmation question`, () => {
    const screen = setup();

    expect(
      screen.getByText(
        `Are you sure you want to delete ${mockTask.name}? This action is irreversible.`,
      ),
    ).toBeInTheDocument();
  });
  it(`Calls cancel if the cancel button is pressed`, () => {
    const screen = setup();

    const cancelButton = screen.getByRole('button', { name: common.cancel });
    fireEvent.click(cancelButton);

    expect(mockCancel).toHaveBeenCalled();
  });
  it(`Calls cancel if the modal is blurred`, () => {
    const screen = setup();

    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);

    expect(mockCancel).toHaveBeenCalled();
  });
  it(`Deleting calls submit handler`, async () => {
    const screen = setup([deleteTaskMutation()]);

    const deleteButton = screen.getByRole('button', { name: common.delete });
    fireEvent.click(deleteButton);

    await waitFor(() => expect(deleteButton).toBeDisabled());

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
    expect(deleteButton).toBeEnabled();
  });
});
