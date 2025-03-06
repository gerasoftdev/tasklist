import { BodyRegular, Col, H1, LinkText, OverlaySpinner } from '@repo/ui';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'wouter';
import { useVerifyEmailMutation } from '@/hooks/apollo/api';
import { RouterLink } from '@/components/RouterLink';
import { ROUTES } from '@/constants/routes';

export const VerifyEmail = () => {
  const { verificationTokenId } = useParams<{ verificationTokenId: string }>();
  const { t } = useTranslation(['auth', 'common']);
  const [_, navigate] = useLocation();

  const [verifyEmailMutation, { error }] = useVerifyEmailMutation({
    preventToastErrors: true,
  });

  useEffect(() => {
    verifyEmailMutation({
      variables: {
        data: { verificationTokenId },
      },
    })
      .then(({ data }) => {
        const passwordTokenId = data?.verifyEmail.passwordTokenId;

        if (passwordTokenId) navigate(ROUTES.SET_PASSWORD({ passwordTokenId }));
      })
      .catch(() => null);
  }, [navigate, verificationTokenId, verifyEmailMutation]);

  if (error) {
    return (
      <Col className="flex-1 gap-lg">
        <H1>{t('auth:verificationFailed')}</H1>
        <BodyRegular className="inline">
          {`${t('auth:verificationFailedMessage')} `}
          <RouterLink className="inline py-sm" to={ROUTES.SIGN_UP}>
            <LinkText $bold className="inline text-p500">
              {t('auth:signUp')}
            </LinkText>
          </RouterLink>
        </BodyRegular>
      </Col>
    );
  }
  return <OverlaySpinner transparent />;
};
