import type { FC } from 'react';
import { Overlay } from '../Overlay';
import { Spinner } from '../Spinner';

type Props = {
  testID?: string;
};

export const OverlaySpinner: FC<Props> = ({ testID }) => (
  <Overlay>
    <Spinner testID={testID} />
  </Overlay>
);
