import { BodySmall, Col, SecondaryButton, size } from '@repo/ui';
import { Overlay } from 'node_modules/@repo/ui/src/components/Overlay';
import { useRef } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/hooks/useAppStore';
import { Sidebar } from '@/components/Sidebar';
import { useAuthStore } from '@/hooks/useAuthStore';
import { logout } from '@/utils/logout';

export const TasksSidebar = () => {
  const { t } = useTranslation(['auth', 'common']);
  const { isSidebarOpen, setIsSidebarOpen } = useAppStore();
  const { auth } = useAuthStore();

  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      setIsSidebarOpen(false);
    }
  };

  const handleSignOut = () => {
    setIsSidebarOpen(false);
    logout();
  };

  if (!isSidebarOpen) return null;

  return (
    <Overlay
      className="pr-xxl"
      onClick={handleOverlayClick}
      ref={overlayRef}
      testID="sidebar-overlay"
    >
      <Sidebar>
        <Col className="gap-md">
          <SecondaryButton
            $size="l"
            aria-label={t('common:close')}
            className="mr-auto"
            onClick={() => {
              setIsSidebarOpen(false);
            }}
          >
            <IoChevronBack size={size.xs} />
          </SecondaryButton>
          <Col>
            <BodySmall $bold>{t('auth:signedInAs')}</BodySmall>
            <BodySmall>{auth?.email}</BodySmall>
          </Col>
        </Col>
        <SecondaryButton
          className="mt-auto justify-center"
          label={t('auth:signOut')}
          onClick={handleSignOut}
        />
      </Sidebar>
    </Overlay>
  );
};
