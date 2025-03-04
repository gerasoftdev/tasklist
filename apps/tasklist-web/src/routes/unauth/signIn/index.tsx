import { zodResolver } from '@hookform/resolvers/zod';
import {
  Col,
  GhostButton,
  H1,
  Input,
  Note,
  OverlaySpinner,
  PrimaryButton,
  size,
} from '@repo/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TypeOf } from 'zod';
import { object, string } from 'zod';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useSignInMutation } from '@/hooks/apollo/api';
import { useAuthStore } from '@/hooks/useAuthStore';
import { apolloClient } from '@/utils/apollo-client';
import { ROUTES } from '@/constants/routes';
import { AuthLink } from '@/routes/unauth/components/AuthLink';

const signInFormSchema = object({
  email: string().email(),
  password: string(),
});
type FormData = TypeOf<typeof signInFormSchema>;

export const SignIn = () => {
  const { t } = useTranslation(['auth', 'common']);
  const [showPassword, setShowPassword] = useState(false);
  const { setTokens } = useAuthStore();

  const [signInMutation, { loading: signing, error }] = useSignInMutation();
  const isLoading = signing;

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<FormData>({
    resolver: zodResolver(signInFormSchema),
    mode: 'onChange',
  });
  const disabled = isLoading || !isDirty || !isValid;

  const onSubmit = (data: FormData) => {
    if (isLoading) return;

    signInMutation({
      variables: { data },
    })
      .then((result) => {
        if (result.data) {
          const { accessToken } = result.data.signIn;
          setTokens({ accessToken });

          apolloClient.resetStore();
        }
      })
      .catch(() => null);
  };

  return (
    <>
      <Col className="flex-1 gap-lg">
        <H1>{t('auth:signIn')}</H1>
        <form
          className="flex-col items-stretch gap-md self-stretch"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register('email')}
            $size="l"
            autoComplete="email"
            error={errors.email?.message}
            id="email"
            label={t('auth:email')}
            placeholder="email@example.com"
            required
            type="email"
          />
          <Input
            {...register('password')}
            $size="l"
            IconRight={
              <GhostButton
                aria-label={t('auth:showPassword')}
                id="showPassword"
                onClick={() => {
                  setShowPassword((v) => !v);
                }}
              >
                {showPassword ? (
                  <IoEyeOff size={size.xs} />
                ) : (
                  <IoEye size={size.xs} />
                )}
              </GhostButton>
            }
            error={errors.password?.message}
            id="password"
            label={t('auth:password')}
            placeholder="****"
            required
            type={showPassword ? 'text' : 'password'}
          />
          <PrimaryButton
            className="justify-center self-stretch"
            disabled={disabled}
            label={t('common:submit')}
            type="submit"
          />
          {error?.message ? (
            <Note className="text-red">{error.message}</Note>
          ) : null}
        </form>
        <Col className="mt-auto">
          <AuthLink
            linkText={t('auth:requestNewPassword')}
            route={ROUTES.RESET_PASSWORD}
            text={t('auth:forgotPassword')}
          />

          <AuthLink
            linkText={t('auth:createAccount')}
            route={ROUTES.SIGN_UP}
            text={t('auth:dontHaveAccount')}
          />
        </Col>
      </Col>
      {isLoading ? <OverlaySpinner /> : null}
    </>
  );
};
