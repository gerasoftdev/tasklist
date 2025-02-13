import { Row } from '@repo/ui';
import type { FC, PropsWithChildren } from 'react';

export const NavigationBar: FC<PropsWithChildren> = ({ children }) => {
  return <Row className="p-md mt-auto">{children}</Row>;
};
