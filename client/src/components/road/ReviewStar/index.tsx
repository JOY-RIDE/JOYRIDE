import styles from './ReviewStar.module.scss';
import classNames from 'classnames/bind';
import StarIcon from '../StarIcon';
import React, { useMemo } from 'react';

const cn = classNames.bind(styles);

interface StarProps {
  index: number;
  rating: number;
  hoverRating: number;
  onMouseEnter: (index: number) => void;
  //   onMouseLeave: () => void;
  onSaveRating: (index: number) => void;
}

const ReviewStar = (props: StarProps) => {
  const { index, rating, hoverRating, onMouseEnter, onSaveRating } = props;

  const fillColor = useMemo(() => {
    if (hoverRating >= index) {
      return '#ffa740'; // #ffa740 === 노란색
    } else if (!hoverRating && rating >= index) {
      return '#ffa740'; // #ffa740 === 노란색
    }
    return '#eeeeee';
  }, [rating, hoverRating, index]);

  return (
    <div
      className={cn('stars')}
      onMouseEnter={() => onMouseEnter(index)}
      onClick={() => onSaveRating(index)}
    >
      <StarIcon fillColor={fillColor} />
    </div>
  );
};

export default ReviewStar;
