import { zodResolver } from '@hookform/resolvers/zod';
import {
  BodyRegular,
  BodySmall,
  Col,
  GhostButton,
  H1,
  Input,
  LinkText,
  PrimaryButton,
  size,
  Spinner,
} from '@repo/ui';
import { passwordSchema } from '@repo/validation-schema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TypeOf } from 'zod';
import { object, string } from 'zod';
import { useLocation, useParams } from 'wouter';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import {
  useSetPasswordMutation,
  useVerifyPasswordTokenQuery,
} from '@/hooks/apollo/api';
import { ROUTES } from '@/constants/routes';
import { useMessageStore } from '@/hooks/useMessageStore';
import { RouterLink } from '@/components/RouterLink';

const setPasswordFormSchema = object({
  password: passwordSchema,
  confirmPassword: string(),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  path: ['confirmPassword'],
  params: { i18n: 'passwordsMustMatch' },
});
type FormData = TypeOf<typeof setPasswordFormSchema>;

export const SetPassword = () => {
  const { passwordTokenId } = useParams<{ passwordTokenId: string }>();
  const { t } = useTranslation(['auth', 'common']);
  const [_, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { addMessages } = useMessageStore();

  const [setPasswordMutation, { loading: creating, error }] =
    useSetPasswordMutation({
      preventToastErrors: true,
    });
  const {
    data: verifyPasswordTokenResult,
    loading: verifying,
    refetch,
  } = useVerifyPasswordTokenQuery({
    variables: {
      data: { passwordTokenId },
    },
  });
  const isVerified = verifyPasswordTokenResult?.verifyPasswordToken;

  const isLoading = creating || verifying;

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<FormData>({
    resolver: zodResolver(setPasswordFormSchema),
    mode: 'onChange',
  });
  const disabled = isLoading || !isDirty || !isValid;

  const onSubmit = (data: FormData) => {
    if (disabled) return;

    setPasswordMutation({
      variables: {
        data: {
          password: data.password,
          passwordTokenId,
        },
      },
    })
      .then((result) => {
        if (result.data?.setPassword) {
          navigate(ROUTES.SIGN_IN);
          addMessages([
            {
              type: 'success',
              text: t('auth:setPasswordConfirmation'),
            },
          ]);
        } else {
          refetch();
        }
      })
      .catch(() => null);
  };

  if (verifying) {
    return (
      <Col className="flex-1 items-center justify-center">
        <Spinner testID="spinner" />
      </Col>
    );
  }

  return (
    <Col className="flex-1 gap-lg">
      {!isVerified ? (
        <>
          <H1>{t('auth:setPasswordFailed')}</H1>
          <BodyRegular className="inline">
            {`${t('auth:setPasswordFailedMessage')} `}
            <RouterLink className="inline py-sm" to={ROUTES.SIGN_UP}>
              <LinkText $bold className="inline text-p500">
                {t('auth:resetPassword')}
              </LinkText>
            </RouterLink>
          </BodyRegular>
        </>
      ) : (
        <>
          <H1>{t('auth:setPassword')}</H1>
          <form
            className="flex-col items-stretch gap-md self-stretch"
            onSubmit={handleSubmit(onSubmit)}
          >
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
              disabled={isLoading}
              error={errors.password?.message}
              id="password"
              label={t('auth:password')}
              placeholder="****"
              required
              type={showPassword ? 'text' : 'password'}
            />
            <Input
              {...register('confirmPassword')}
              $size="l"
              disabled={isLoading}
              error={errors.confirmPassword?.message}
              id="confirmPassword"
              label={t('auth:confirmPassword')}
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
              <BodySmall className="text-red">{error.message}</BodySmall>
            ) : null}
          </form>
        </>
      )}
    </Col>
  );
};
