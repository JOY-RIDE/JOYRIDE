import styles from './ReviewTitle.module.scss';
import classNames from 'classnames/bind';
import { PropsWithChildren } from 'react';

const cn = classNames.bind(styles);

const ReviewTitle = ({ content }: PropsWithChildren<{ content: string }>) => (
  <h3 className={cn('title')}>{content}</h3>
);

export default ReviewTitle;
