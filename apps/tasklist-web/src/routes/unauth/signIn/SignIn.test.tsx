import { describe, it, expect, vi } from 'vitest';
import type { memoryLocation } from 'wouter/memory-location';
import { SignIn as SignInMutationDocument } from '@repo/graphql';
import type { SignInMutation, SignInMutationVariables } from '@repo/graphql';
import auth from '@repo/translation/en/auth.json';
import common from '@repo/translation/en/common.json';
import type { MockedResponse } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import { mockQuery, render, fireEvent, waitFor } from '@/utils/testUtils';
import { SignIn } from '@/routes/unauth/signIn';
import {
  mockSignInResponse,
  mockSignInErrorResponse,
  mockEmail,
  mockPassword,
  mockAccessToken,
} from '@/__fixtures__/auth';

const signInMutationError = mockQuery<SignInMutation, SignInMutationVariables>(
  SignInMutationDocument,
  {
    variables: { data: { email: mockEmail, password: mockPassword } },
    errors: [new GraphQLError('Invalid credentials.')],
  },
);

export const signInMutation = mockQuery<
  SignInMutation,
  SignInMutationVariables
>(SignInMutationDocument, {
  variables: { data: { email: mockEmail, password: mockPassword } },
  result: {
    signIn: {
      accessToken: mockAccessToken,
    },
  },
});

const setTokensMock = vi.fn();
const resetMock = vi.fn();

vi.mock('@/hooks/useAuthStore', () => ({
  useAuthStore: () => ({
    setTokens: setTokensMock,
    reset: resetMock,
  }),
}));

const setup = (
  mocks: MockedResponse[] = [],
  location?: ReturnType<typeof memoryLocation>,
) =>
  render(<SignIn />, {
    mocks,
    location,
  });

describe('SignIn Component', () => {
  it('Renders form fields and sign-in button', () => {
    const screen = setup();

    expect(screen.getByLabelText(auth.email)).toBeInTheDocument();
    expect(screen.getByLabelText(auth.password)).toBeInTheDocument();
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
    fireEvent.change(screen.getByLabelText(auth.password), {
      target: { value: 'password' },
    });

    await waitFor(() => expect(submitButton).toBeDisabled());
  });

  it('Enables submit button with valid input', async () => {
    const screen = setup();

    fireEvent.change(screen.getByLabelText(auth.email), {
      target: { value: mockEmail },
    });
    fireEvent.change(screen.getByLabelText(auth.password), {
      target: { value: mockPassword },
    });

    const submitButton = screen.getByRole('button', { name: common.submit });
    await waitFor(() => expect(submitButton).toBeEnabled());
  });

  it('Displays an error message if sign-in fails', async () => {
    const screen = setup([signInMutationError()]);

    fireEvent.change(screen.getByLabelText(auth.email), {
      target: { value: mockEmail },
    });
    fireEvent.change(screen.getByLabelText(auth.password), {
      target: { value: mockPassword },
    });

    const submitButton = screen.getByRole('button', { name: common.submit });
    await waitFor(() => expect(submitButton).toBeEnabled());
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText(mockSignInErrorResponse.message),
      ).toBeInTheDocument(),
    );
  });

  it('Disables form controls while loading', async () => {
    const screen = setup([
      signInMutation({
        withLoading: true,
        loadingFor: Infinity,
      }),
    ]);
    const emailInput = screen.getByLabelText(auth.email);
    const passwordInput = screen.getByLabelText(auth.password);

    fireEvent.change(emailInput, {
      target: { value: mockEmail },
    });
    fireEvent.change(passwordInput, {
      target: { value: mockPassword },
    });

    const submitButton = screen.getByRole('button', { name: common.submit });
    await waitFor(() => expect(submitButton).toBeEnabled());
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
    });
  });

  it('Sets tokens and resets store after successful sign-in', async () => {
    const screen = setup([signInMutation()]);

    fireEvent.change(screen.getByLabelText(auth.email), {
      target: { value: mockEmail },
    });
    fireEvent.change(screen.getByLabelText(auth.password), {
      target: { value: mockPassword },
    });

    const submitButton = screen.getByRole('button', { name: common.submit });
    await waitFor(() => expect(submitButton).toBeEnabled());
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(setTokensMock).toHaveBeenCalledWith({
        accessToken: mockSignInResponse.accessToken,
      });
    });
  });

  it('Toggles password visibility', () => {
    const screen = setup();

    const passwordInput = screen.getByLabelText(auth.password);
    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(screen.getByLabelText(auth.showPassword));
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
