import { describe, it, expect } from 'vitest';
import auth from '@repo/translation/en/auth.json';
import type { MockedResponse } from '@apollo/client/testing';
import { memoryLocation } from 'wouter/memory-location';
import { Route } from 'wouter';
import { render, waitFor } from '@/utils/testUtils';
import { VerifyEmail } from '@/routes/unauth/verifyEmail';
import {
  mockVerificationTokenId,
  mockPasswordTokenId,
  mockVerifyEmailLocation,
} from '@/__fixtures__/auth';
import { ROUTES } from '@/constants/routes';
import {
  verifyEmailMutationError,
  verifyEmailMutationSuccess,
} from '@/routes/unauth/verifyEmail/mockQueries';

const setup = (
  mocks: MockedResponse[] = [],
  location?: ReturnType<typeof memoryLocation>,
) =>
  render(
    <Route
      path={ROUTES.VERIFY_EMAIL({
        verificationTokenId: ':verificationTokenId',
      })}
    >
      <VerifyEmail />
    </Route>,
    {
      mocks,
      location,
      path: `/verifyEmail/${mockVerificationTokenId}`,
    },
  );

describe('VerifyEmail Component', () => {
  it('Shows a spinner while loading', () => {
    const screen = setup([
      verifyEmailMutationSuccess({
        withLoading: true,
        loadingFor: Infinity,
      }),
    ]);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Navigates to set password route on successful verification', async () => {
    const location = memoryLocation({
      path: mockVerifyEmailLocation,
      record: true,
    });
    setup([verifyEmailMutationSuccess()], location);

    await waitFor(() =>
      expect(location.history[location.history.length - 1]).toBe(
        `/setPassword/${mockPasswordTokenId}`,
      ),
    );
  });

  it('Displays an error message if verification fails', async () => {
    const screen = setup([verifyEmailMutationError()]);

    await waitFor(() =>
      expect(screen.getByText(auth.verificationFailed)).toBeInTheDocument(),
    );
    expect(screen.getByText(auth.verificationFailed)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: auth.signUp })).toBeInTheDocument();
  });
});
