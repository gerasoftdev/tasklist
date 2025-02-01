import common from '@repo/translation/en/common.json';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@/utils/testUtils';
import { mockTask } from '@/__fixtures__/task';
import { DeleteTaskModal } from '@/routes/auth/features/DeleteTaskModal';

const mockSubmit = vi.fn();
const mockCancel = vi.fn();

const mockDeleteTask = vi.fn();

vi.mock('@/hooks/mockTaskApi', () => ({
  useMockTaskApi: () => ({
    deleteTask: mockDeleteTask,
  }),
}));

const setup = () =>
  render(
    <DeleteTaskModal
      onCancel={mockCancel}
      onSubmit={mockSubmit}
      task={mockTask}
    />,
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
    const screen = setup();

    const deleteButton = screen.getByRole('button', { name: common.delete });
    fireEvent.click(deleteButton);

    await waitFor(() => expect(mockDeleteTask).toHaveBeenCalled());
    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
  });
});
