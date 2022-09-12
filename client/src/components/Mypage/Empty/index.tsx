import styles from './Empty.module.scss';
import classNames from 'classnames/bind';
import { ReactElement } from 'react';

const cn = classNames.bind(styles);

interface EmptyProps {
  Icon: ReactElement;
  content: string;
}

const Empty = ({ Icon, content }: EmptyProps) => (
  <div className={cn('wrapper')}>
    {Icon}
    <h1 className={cn('title')}>{content}</h1>
  </div>
);

export default Empty;
