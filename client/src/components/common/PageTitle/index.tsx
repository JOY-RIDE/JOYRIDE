import { PropsWithChildren } from 'react';
import styles from './PageTitle.module.scss';
import classNames from 'classnames/bind';

interface Size {
  size: 'sm' | 'md' | 'lg';
}

const cn = classNames.bind(styles);

const PageTitle = ({ children, size = 'md' }: PropsWithChildren<Size>) => (
  <h1 className={cn('title', size)}>{children}</h1>
);

export default PageTitle;
