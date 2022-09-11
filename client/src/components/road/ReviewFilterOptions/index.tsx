import { useState } from 'react';
import styles from './ReviewFilterOptions.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface CommonProps {
  content: string;
  rating?: number;
  isChosen: boolean;
}

const ReviewFilterOptions = ({ content, rating, isChosen }: CommonProps) => {
  const [currentFilter, setcurrentFilter] = useState('전체');
  const onClickFilter = () => {
    setcurrentFilter(content);
  };

  return (
    // TODO 리뷰 필터에 따른 스타일 변경
    <li
      key={content}
      className={cn('option', { active: isChosen })}
      onClick={onClickFilter}
    >
      <span className={cn('content')}>{content}</span>
      {rating ? <span className={cn('rating')}>{rating}</span> : undefined}
    </li>
  );
};

export default ReviewFilterOptions;
