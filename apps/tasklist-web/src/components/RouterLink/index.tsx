import type { FC, HTMLAttributes } from 'react';
import type { LinkProps } from 'wouter';
import { Link } from 'wouter';

type Props = LinkProps & HTMLAttributes<HTMLLinkElement>;

export const RouterLink: FC<Props> = ({ ...props }) => {
  return <Link {...props} />;
};
