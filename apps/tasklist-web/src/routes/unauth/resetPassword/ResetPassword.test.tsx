import { describe, it, expect } from 'vitest';
import type { memoryLocation } from 'wouter/memory-location';
import { ResetPassword as ResetPasswordMutationDocument } from '@repo/graphql';
import type {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from '@repo/graphql';
import auth from '@repo/translation/en/auth.json';
import common from '@repo/translation/en/common.json';
import type { MockedResponse } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import { mockQuery, render, fireEvent, waitFor } from '@/utils/testUtils';
import { ResetPassword } from '@/routes/unauth/resetPassword';
import { mockEmail } from '@/__fixtures__/auth';

const resetPasswordMutationError = mockQuery<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>(ResetPasswordMutationDocument, {
  variables: { data: { email: mockEmail } },
  errors: [new GraphQLError('Invalid email address.')],
});

const resetPasswordMutation = mockQuery<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>(ResetPasswordMutationDocument, {
  variables: { data: { email: mockEmail } },
  result: {
    resetPassword: true,
  },
});

const setup = (
  mocks: MockedResponse[] = [],
  location?: ReturnType<typeof memoryLocation>,
) =>
  render(<ResetPassword />, {
    mocks,
    location,
  });

describe('ResetPassword Component', () => {
  it('Renders form fields and reset password button', () => {
    const screen = setup();
    expect(screen.getByLabelText(auth.email)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: common.submit }),
    ).toBeInTheDocument();
  });

  it('Disables submit button when form is incomplete or invalid', async () => {
    const screen = setup();

    const submitButton = screen.getByRole('button', { name: common.submit });
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(auth.email), {
      target: { value: 'invalid-email' },
    });

    await waitFor(() => expect(submitButton).toBeDisabled());
  });

  it('Enables submit button with valid input', async () => {
    const screen = setup();

    fireEvent.change(screen.getByLabelText(auth.email), {
      target: { value: mockEmail },
    });

    const submitButton = screen.getByRole('button', { name: common.submit });
    await waitFor(() => expect(submitButton).toBeEnabled());
  });

  it('Displays an error message if reset password fails', async () => {
    const screen = setup([resetPasswordMutationError()]);

    fireEvent.change(screen.getByLabelText(auth.email), {
      target: { value: mockEmail },
    });

    const submitButton = screen.getByRole('button', { name: common.submit });
    await waitFor(() => expect(submitButton).toBeEnabled());
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText('Invalid email address.')).toBeInTheDocument(),
    );
  });

  it('Disables form controls while loading', async () => {
    const screen = setup([
      resetPasswordMutation({
        withLoading: true,
        loadingFor: Infinity,
      }),
    ]);

    const emailInput = screen.getByLabelText(auth.email);

    fireEvent.change(emailInput, {
      target: { value: mockEmail },
    });

    const submitButton = screen.getByRole('button', { name: common.submit });
    await waitFor(() => expect(submitButton).toBeEnabled());
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(emailInput).toBeDisabled();
    });
  });

  it('Shows confirmation message after successful reset password', async () => {
    const screen = setup([resetPasswordMutation()]);

    fireEvent.change(screen.getByLabelText(auth.email), {
      target: { value: mockEmail },
    });

    const submitButton = screen.getByRole('button', { name: common.submit });
    await waitFor(() => expect(submitButton).toBeEnabled());
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
    );

    await waitFor(() =>
      expect(
        screen.getByText(auth.resetPasswordConfirmation),
      ).toBeInTheDocument(),
    );
  });
});
