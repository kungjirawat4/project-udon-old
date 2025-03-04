import Link from 'next/link';
import { forwardRef } from 'react';

import { DEFAULT_PREFETCH } from '@/utils/AppConfig';

type Props = Parameters<typeof Link>['0'];

type NextLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof Props
> &
Props;

export const NextLink = forwardRef<HTMLAnchorElement, NextLinkProps>(
  ({ prefetch, ...props }, ref) => {
    return (
      <Link
        {...props}
        passHref
        ref={ref}
        prefetch={prefetch || DEFAULT_PREFETCH || false}
      />
    );
  },
);

NextLink.displayName = 'NextLink';
