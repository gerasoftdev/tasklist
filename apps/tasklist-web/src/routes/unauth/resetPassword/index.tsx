import { zodResolver } from '@hookform/resolvers/zod';
import {
  BodyRegular,
  BodySmall,
  Col,
  H1,
  Input,
  PrimaryButton,
} from '@repo/ui';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TypeOf } from 'zod';
import { object, string } from 'zod';
import { useState } from 'react';
import { useResetPasswordMutation } from '@/hooks/apollo/api';
import { ROUTES } from '@/constants/routes';
import { AuthLink } from '@/routes/unauth/components/AuthLink';

const resetPasswordFormSchema = object({
  email: string().email(),
});
type FormData = TypeOf<typeof resetPasswordFormSchema>;

export const ResetPassword = () => {
  const { t } = useTranslation(['auth', 'common']);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [resetPasswordMutation, { loading: signing, error }] =
    useResetPasswordMutation({
      preventToastErrors: true,
    });
  const isLoading = signing;

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: 'onChange',
  });
  const disabled = isLoading || !isDirty || !isValid;

  const onSubmit = (data: FormData) => {
    if (isLoading) return;

    resetPasswordMutation({
      variables: { data },
    })
      .then((result) => {
        if (result.data) {
          setIsConfirmed(true);
        }
      })
      .catch(() => null);
  };

  return (
    <Col className="flex-1 gap-lg">
      {isConfirmed ? (
        <>
          <H1>{t('auth:resetPassword')}</H1>
          <BodyRegular>{t('auth:resetPasswordConfirmation')}</BodyRegular>
        </>
      ) : (
        <>
          <H1>{t('auth:resetPassword')}</H1>
          <form
            className="flex-col items-stretch gap-md self-stretch"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              {...register('email')}
              $size="l"
              autoComplete="email"
              disabled={isLoading}
              error={errors.email?.message}
              id="email"
              label={t('auth:email')}
              placeholder="email@example.com"
              required
              type="email"
            />
            <PrimaryButton
              className="justify-center self-stretch"
              disabled={disabled}
              label={t('common:submit')}
              type="submit"
            />
            {error?.message ? (
              <BodySmall className="text-red">{error.message}</BodySmall>
            ) : null}
          </form>
          <Col className="mt-auto">
            <AuthLink
              linkText={t('auth:signInHere')}
              route={ROUTES.SIGN_IN}
              text={t('auth:rememberPassword')}
            />
            <AuthLink
              linkText={t('auth:createAccount')}
              route={ROUTES.SIGN_UP}
              text={t('auth:dontHaveAccount')}
            />
          </Col>
        </>
      )}
    </Col>
  );
};
