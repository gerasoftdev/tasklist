import { newTask as placeholderText } from '@repo/translation/en/task.json';
import {
  submit as submitLabel,
  discard as discardLabel,
} from '@repo/translation/en/common.json';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@/utils/testUtils';
import { mockTaskName } from '@/__fixtures__/task';
import { AddTask } from '@/routes/auth/features/AddTask';

const setup = () => render(<AddTask />);

const mockCreateTask = vi.fn();

vi.mock('@/hooks/mockTaskApi', () => ({
  useMockTaskApi: () => ({
    createTask: mockCreateTask,
  }),
}));

describe('Add task', () => {
  it(`Shows input with "${placeholderText}" placeholder`, () => {
    const screen = setup();

    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });
  it('Pressing the input shows submit and discard buttons', () => {
    const screen = setup();

    expect(screen.queryByLabelText(submitLabel)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(discardLabel)).not.toBeInTheDocument();

    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent.focus(input);

    expect(screen.queryByLabelText(submitLabel)).toBeInTheDocument();
    expect(screen.queryByLabelText(discardLabel)).toBeInTheDocument();
  });
  it('Invalid value disables submit button, valid value enables it', async () => {
    const screen = setup();

    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent.focus(input);

    const submitButton = screen.getByLabelText(submitLabel);
    expect(submitButton).toBeInTheDocument();

    expect(submitButton).toBeDisabled();

    fireEvent.change(input, { target: { value: mockTaskName } });
    await waitFor(() => expect(submitButton).toBeEnabled());
  });
  it('Blurring the input clears its value, hides submit and discard buttons', () => {
    const screen = setup();

    const input = screen.getByPlaceholderText(placeholderText);

    fireEvent.focus(input);

    fireEvent.change(input, { target: { value: mockTaskName } });
    expect(input).toHaveValue(mockTaskName);

    fireEvent.blur(input);

    expect(screen.queryByLabelText(submitLabel)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(discardLabel)).not.toBeInTheDocument();
    expect(input).toHaveValue('');
  });
  it('Submitting the task calls mutation endpoint, disables submit button until saved', async () => {
    const screen = setup();

    const input = screen.getByPlaceholderText(placeholderText);

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: mockTaskName } });

    const submitButton = screen.getByLabelText(submitLabel);
    await waitFor(() => expect(submitButton).toBeEnabled());

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
    await waitFor(() => expect(input).toHaveValue(''));

    expect(mockCreateTask).toHaveBeenCalledWith(mockTaskName);
  });
});
