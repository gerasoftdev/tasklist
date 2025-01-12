import type { FC, HTMLAttributes } from 'react';

export const Text: FC<HTMLAttributes<HTMLSpanElement>> = (props) => (
  <span {...props} />
);
