import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  [props: string]: any;
};

export default function ActiveLink({ children, className, activeClassName, ...props }: Props) {
  const { asPath } = useRouter();
  const childClassName = className || '';

  // pages/index.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const classNames =
    asPath === props.href || asPath === props.as ? `${childClassName} ${activeClassName}`.trim() : className;

  return (
    <Link {...props} href={props.href} className={classNames}>
      {children}
    </Link>
  );
}
