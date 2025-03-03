import clsx from 'clsx';
import type { FC } from 'react';
import { IoClose } from 'react-icons/io5';
import { BodyRegular } from '../typography';
import { GhostButton } from '../Button';
import { size } from '../../theme';
import { Col } from '../Col';
import { Row } from '../Row';

const toastStyles = clsx(
  'bg-g100',
  'shadow-xl',
  'rounded-sm',
  'cursor-pointer',
);

const titleTypeStyles = {
  success: 'text-green',
  error: 'text-red',
  info: 'text-g900',
  warning: 'text-yellow',
};

type Props = {
  type?: 'success' | 'error' | 'info' | 'warning';
  title: string;
  onClick?: () => void;
  onClose?: () => void;
  message: string;
  className?: string;
  closeButtonLabel?: string;
};

export const Toast: FC<Props> = ({
  type = 'info',
  title,
  onClick,
  onClose,
  message,
  className = '',
  closeButtonLabel = 'Close',
}) => {
  return (
    <Col className={clsx(toastStyles, className)} onClick={onClick}>
      <Row className="items-center">
        <BodyRegular $bold className={clsx('ml-sm', titleTypeStyles[type])}>
          {title}
        </BodyRegular>

        {onClose ? (
          <GhostButton
            aria-label={closeButtonLabel}
            className="ml-auto items-center justify-center"
            onClick={onClose}
          >
            <IoClose className="text-g500" size={size.xs} />
          </GhostButton>
        ) : null}
      </Row>
      <BodyRegular className="px-sm pb-sm">{message}</BodyRegular>
    </Col>
  );
};
