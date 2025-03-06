import { describe, it, expect } from 'vitest';
import auth from '@repo/translation/en/auth.json';
import common from '@repo/translation/en/common.json';
import type { MockedResponse } from '@apollo/client/testing';
import { memoryLocation } from 'wouter/memory-location';
import { Route } from 'wouter';
import { render, fireEvent, waitFor } from '@/utils/testUtils';
import { SetPassword } from '@/routes/unauth/setPassword';
import {
  mockPassword,
  mockPasswordTokenId,
  mockSetPasswordLocation,
} from '@/__fixtures__/auth';
import { ROUTES } from '@/constants/routes';
import {
  setPasswordMutationError,
  setPasswordMutationSuccess,
  verifyPasswordQueryFail,
  verifyPasswordQuerySuccess,
} from '@/routes/unauth/setPassword/mockQueries';

const setup = (
  mocks: MockedResponse[] = [],
  location?: ReturnType<typeof memoryLocation>,
) =>
  render(
    <Route path={ROUTES.SET_PASSWORD({ passwordTokenId: ':passwordTokenId' })}>
      <SetPassword />
    </Route>,
    {
      mocks,
      location,
      path: `/setPassword/${mockPasswordTokenId}`,
    },
  );

describe('SetPassword Component', () => {
  describe('Verification fail', () => {
    it('Shows loading spinner while verifying password token', async () => {
      const screen = setup([
        verifyPasswordQueryFail({
          withLoading: true,
          loadingFor: Infinity,
        }),
      ]);

      await waitFor(() =>
        expect(screen.queryByTestId('spinner')).toBeInTheDocument(),
      );
    });
    it('Shows error message if the password token is invalid', async () => {
      const screen = setup([verifyPasswordQueryFail()]);

      await waitFor(() =>
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      );

      expect(screen.getByText(auth.setPasswordFailed)).toBeInTheDocument();
    });
  });
  describe('Verfication success', () => {
    it('Renders form fields and submit button', async () => {
      const screen = setup([verifyPasswordQuerySuccess()]);

      await waitFor(() =>
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      );

      expect(screen.getByLabelText(auth.password)).toBeInTheDocument();
      expect(screen.getByLabelText(auth.confirmPassword)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: common.submit }),
      ).toBeInTheDocument();
    });

    it('Disables submit button when form is incomplete or invalid', async () => {
      const screen = setup([verifyPasswordQuerySuccess()]);

      await waitFor(() =>
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      );

      const submitButton = screen.getByRole('button', { name: common.submit });
      expect(submitButton).toBeDisabled();

      fireEvent.change(screen.getByLabelText(auth.password), {
        target: { value: 'short' },
      });
      fireEvent.change(screen.getByLabelText(auth.confirmPassword), {
        target: { value: 'mismatch' },
      });

      await waitFor(() => expect(submitButton).toBeDisabled());
    });

    it('Enables submit button with valid input', async () => {
      const screen = setup([verifyPasswordQuerySuccess()]);

      await waitFor(() =>
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      );

      fireEvent.change(screen.getByLabelText(auth.password), {
        target: { value: mockPassword },
      });
      fireEvent.change(screen.getByLabelText(auth.confirmPassword), {
        target: { value: mockPassword },
      });

      const submitButton = screen.getByRole('button', { name: common.submit });
      await waitFor(() => expect(submitButton).toBeEnabled());
    });

    it('Displays an error message if password setup fails', async () => {
      const screen = setup([
        verifyPasswordQuerySuccess(),
        setPasswordMutationError(),
      ]);

      await waitFor(() =>
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      );

      fireEvent.change(screen.getByLabelText(auth.password), {
        target: { value: mockPassword },
      });
      fireEvent.change(screen.getByLabelText(auth.confirmPassword), {
        target: { value: mockPassword },
      });

      const submitButton = screen.getByRole('button', { name: common.submit });
      await waitFor(() => expect(submitButton).toBeEnabled());
      fireEvent.click(submitButton);

      await waitFor(() =>
        expect(screen.getByText('Failed to set password.')).toBeInTheDocument(),
      );
    });

    it('Disables form controls while loading', async () => {
      const screen = setup([
        verifyPasswordQuerySuccess(),
        setPasswordMutationSuccess({
          withLoading: true,
          loadingFor: Infinity,
        }),
      ]);

      await waitFor(() =>
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      );

      const passwordInput = screen.getByLabelText(auth.password);
      const confirmPasswordInput = screen.getByLabelText(auth.confirmPassword);

      fireEvent.change(passwordInput, {
        target: { value: mockPassword },
      });
      fireEvent.change(confirmPasswordInput, {
        target: { value: mockPassword },
      });

      const submitButton = screen.getByRole('button', { name: common.submit });
      await waitFor(() => expect(submitButton).toBeEnabled());
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(passwordInput).toBeDisabled();
        expect(confirmPasswordInput).toBeDisabled();
        expect(submitButton).toBeDisabled();
      });
    });

    it('Navigates to sign-in page with confirmation after successful password setup', async () => {
      const location = memoryLocation({
        path: mockSetPasswordLocation,
        record: true,
      });
      const screen = setup(
        [verifyPasswordQuerySuccess(), setPasswordMutationSuccess()],
        location,
      );

      await waitFor(() =>
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      );

      fireEvent.change(screen.getByLabelText(auth.password), {
        target: { value: mockPassword },
      });
      fireEvent.change(screen.getByLabelText(auth.confirmPassword), {
        target: { value: mockPassword },
      });

      const submitButton = screen.getByRole('button', { name: common.submit });
      await waitFor(() => expect(submitButton).toBeEnabled());
      fireEvent.click(submitButton);

      await waitFor(() =>
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      );

      await waitFor(() => {
        expect(location.history[location.history.length - 1]).toBe(
          ROUTES.SIGN_IN,
        );
      });
    });

    it('Toggles password visibility', async () => {
      const screen = setup([verifyPasswordQuerySuccess()]);

      await waitFor(() =>
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      );

      const passwordInput = screen.getByLabelText(auth.password);
      expect(passwordInput).toHaveAttribute('type', 'password');

      fireEvent.click(screen.getByLabelText(auth.showPassword));
      expect(passwordInput).toHaveAttribute('type', 'text');
    });
  });
});
