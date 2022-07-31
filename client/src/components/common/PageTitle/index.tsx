import { PropsWithChildren } from 'react';
import styles from './PageTitle.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SizeProp {
  size: 'sm' | 'md' | 'lg';
}

// TODO: memo?
const PageTitle = ({ size = 'md', children }: PropsWithChildren<SizeProp>) => (
  <h1 className={cn('title', size)}>{children}</h1>
);

export default PageTitle;
