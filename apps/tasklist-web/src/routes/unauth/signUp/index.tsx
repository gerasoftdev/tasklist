import { zodResolver } from '@hookform/resolvers/zod';
import {
  BodyRegular,
  BodySmall,
  Col,
  H1,
  Input,
  PrimaryButton,
} from '@repo/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TypeOf } from 'zod';
import { object, string } from 'zod';
import { useSignUpMutation } from '@/hooks/apollo/api';
import { AuthLink } from '@/routes/unauth/components/AuthLink';
import { ROUTES } from '@/constants/routes';

const signUpFormSchema = object({
  email: string().email(),
});
type FormData = TypeOf<typeof signUpFormSchema>;

export const SignUp = () => {
  const { t } = useTranslation(['auth', 'common']);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [signUpMutation, { loading: creating, error }] = useSignUpMutation({
    preventToastErrors: true,
  });
  const isLoading = creating;

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onChange',
  });
  const disabled = isLoading || !isDirty || !isValid;

  const onSubmit = (data: FormData) => {
    if (disabled) return;

    signUpMutation({
      variables: { data },
    })
      .then((result) => {
        if (result.data?.signUp) {
          setIsConfirmed(true);
        }
      })
      .catch(() => null);
  };

  return (
    <Col className="flex-1 gap-lg">
      {isConfirmed ? (
        <>
          <H1>{t('auth:signUp')}</H1>
          <BodyRegular>{t('auth:signUpConfirmation')}</BodyRegular>
        </>
      ) : (
        <>
          <H1>{t('auth:signUp')}</H1>
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
              linkText={t('auth:signIn')}
              route={ROUTES.SIGN_IN}
              text={t('auth:haveAccountAlready')}
            />
          </Col>
        </>
      )}
    </Col>
  );
};
