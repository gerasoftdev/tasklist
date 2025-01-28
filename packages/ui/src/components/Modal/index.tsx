import { useRef, type FC, type PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import { IoClose } from 'react-icons/io5';
import { H3 } from '../typography';
import { Overlay } from '../Overlay';
import { Row } from '../Row';
import { Col } from '../Col';
import { GhostButton } from '../Button';
import { size } from '../../theme';

export const modalContainerStyles = clsx(
  'flex-col',
  'm-auto',
  'max-w-full',
  'bg-g100',
  'p-md',
  'rounded-md',
  'shadow-md',
  'gap-md',
  'min-h-n',
);

type Props = {
  onClose: () => void;
  className?: string;
  hideCloseButton?: boolean;
  title?: string;
  closeButtonLabel?: string;
  overlayTestID?: string;
};

export const Modal: FC<PropsWithChildren<Props>> = ({
  onClose,
  children,
  hideCloseButton,
  title,
  className = '',
  closeButtonLabel = 'Close',
  overlayTestID = 'overlay',
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };
  const modalClassName = clsx(className, modalContainerStyles);
  return (
    <Overlay
      onClick={handleOverlayClick}
      ref={overlayRef}
      testID={overlayTestID}
    >
      <Col className={modalClassName}>
        {title || !hideCloseButton ? (
          <Row className="items-center">
            {title ? <H3>{title}</H3> : null}
            {!hideCloseButton && (
              <GhostButton
                aria-label={closeButtonLabel}
                className="ml-auto items-center justify-center"
                onClick={onClose}
              >
                <IoClose className="text-g500" size={size.xs} />
              </GhostButton>
            )}
          </Row>
        ) : null}
        {children}
      </Col>
    </Overlay>
  );
};
