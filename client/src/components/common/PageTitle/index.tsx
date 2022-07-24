import { PropsWithChildren } from 'react';
import styles from './PageTitle.module.scss';
import classNames from 'classnames/bind';

interface SizeProp {
  size: 'sm' | 'md' | 'lg';
}

const cn = classNames.bind(styles);

const PageTitle = ({ children, size = 'md' }: PropsWithChildren<SizeProp>) => (
  <h1 className={cn('title', size)}>{children}</h1>
);

export default PageTitle;
