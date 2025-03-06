import type { FC } from 'react';
import type { OverlayProps } from '../Overlay';
import { Overlay } from '../Overlay';
import { Spinner } from '../Spinner';

type Props = {
  testID?: string;
} & OverlayProps;

export const OverlaySpinner: FC<Props> = ({ testID, ...overlayProps }) => (
  <Overlay {...overlayProps}>
    <Spinner testID={testID} />
  </Overlay>
);
