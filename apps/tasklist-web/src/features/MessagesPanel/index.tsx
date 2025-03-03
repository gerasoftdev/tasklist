import { BodySmall, Col, SecondaryButton, Toast } from '@repo/ui';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import { useMessageStore } from '@/hooks/useMessageStore';

const toastContainerStyles = clsx(
  'fixed',
  'left-n',
  'bottom-n',
  'gap-sm',
  'max-w-lg',
  'w-full',
  'max-h-[60dvh]',
  'p-sm',
);

const toastScrollerStyles = clsx(
  'overflow-y-auto',
  'gap-sm',
  'p-sm',
  'flex-col-reverse',
);

export const MessagesPanel = () => {
  const { t } = useTranslation(['common']);
  const { messages, removeMessages } = useMessageStore();
  const [_, navigate] = useLocation();

  if (!messages.length) return null;

  return (
    <Col className={toastContainerStyles}>
      <SecondaryButton
        $size="m"
        className="ml-auto shrink-0"
        onClick={removeMessages}
      >
        <BodySmall className="text-g500">{t('common:clear')}</BodySmall>
      </SecondaryButton>
      <Col className={toastScrollerStyles}>
        {messages.map((message) => (
          <Toast
            className="shrink-0"
            key={message.id}
            message={message.text}
            onClick={() => {
              if (message.href) navigate(message.href);
            }}
            onClose={message.remove}
            title={t(message.type)}
            type={message.type}
          />
        ))}
      </Col>
    </Col>
  );
};
