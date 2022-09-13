import React, { useState, useRef } from 'react';
import styles from './ReviewFilter.module.scss';
import classNames from 'classnames/bind';
import ReviewFilterOptions from '../ReviewFilterOptions';

const cn = classNames.bind(styles);

interface ReviewFilterProps {
  view: number | undefined;
  facilities: number | undefined;
  accessibility: number | undefined;
  safety: number | undefined;
}

const ReviewFilter = ({
  view,
  facilities,
  accessibility,
  safety,
}: ReviewFilterProps) => {
  const scrollRef = useRef<any>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState<any>();

  const onDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: React.MouseEvent) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  //@ts-ignore
  const throttle = (func, ms) => {
    let throttled = false;
    //@ts-ignore
    return (...args) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };

  const delay = 100;
  const onThrottleDragMove = throttle(onDragMove, delay);

  return (
    <ul
      className={styles.reviewFilter}
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={onThrottleDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
    >
      <ReviewFilterOptions content={'전체'} isChosen={true} />
      <ReviewFilterOptions content={'경관'} rating={view} isChosen={false} />
      <ReviewFilterOptions
        content={'편의시설'}
        rating={facilities}
        isChosen={false}
      />
      <ReviewFilterOptions
        content={'접근성'}
        rating={accessibility}
        isChosen={false}
      />
      <ReviewFilterOptions content={'안전'} rating={safety} isChosen={false} />
    </ul>
  );
};

export default ReviewFilter;
