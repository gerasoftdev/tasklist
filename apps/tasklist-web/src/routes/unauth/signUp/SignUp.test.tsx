import { describe, it, expect } from 'vitest';
import { SignUp as SignUpMutationDocument } from '@repo/graphql';
import type { SignUpMutation, SignUpMutationVariables } from '@repo/graphql';
import auth from '@repo/translation/en/auth.json';
import common from '@repo/translation/en/common.json';
import type { MockedResponse } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import { mockQuery, render, fireEvent, waitFor } from '@/utils/testUtils';
import { SignUp } from '@/routes/unauth/signUp';
import { mockEmail } from '@/__fixtures__/auth';

const signUpMutationError = mockQuery<SignUpMutation, SignUpMutationVariables>(
  SignUpMutationDocument,
  {
    variables: { data: { email: mockEmail } },
    errors: [new GraphQLError('This email is already registered.')],
  },
);

const signUpMutationSuccess = mockQuery<
  SignUpMutation,
  SignUpMutationVariables
>(SignUpMutationDocument, {
  variables: { data: { email: mockEmail } },
  result: {
    signUp: true,
  },
});

const setup = (mocks: MockedResponse[] = []) => render(<SignUp />, { mocks });

describe('SignUp Component', () => {
  it('Renders form fields and submit button', () => {
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

  it('Displays an error message if sign-up fails', async () => {
    const screen = setup([signUpMutationError()]);

    fireEvent.change(screen.getByLabelText(auth.email), {
      target: { value: mockEmail },
    });

    const submitButton = screen.getByRole('button', { name: common.submit });
    await waitFor(() => expect(submitButton).toBeEnabled());
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText('This email is already registered.'),
      ).toBeInTheDocument(),
    );
  });

  it('Disables form controls while loading', async () => {
    const screen = setup([
      signUpMutationSuccess({
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
      expect(emailInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
    });
  });

  it('Shows confirmation message after successful sign-up', async () => {
    const screen = setup([signUpMutationSuccess()]);

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
      expect(screen.getByText(auth.signUpConfirmation)).toBeInTheDocument(),
    );
  });
});
