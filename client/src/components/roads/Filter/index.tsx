import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Filter.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

const cn = classNames.bind(styles);

const Filter = () => {
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  // 1)
  const [isFilterToggle, setIsFilterToggle] = useState(false);
  const clickOutsidehandler = () => {
    setIsFilterToggle(false);
  };
  useOnClickOutside(filterDropdownRef, clickOutsidehandler);

  return (
    <div className={styles.filter} ref={filterDropdownRef}>
      <button
        className={cn('select')}
        onClick={() => {
          setIsFilterToggle(!isFilterToggle);
        }}
      >
        <span>필터</span>
        {isFilterToggle ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>
      <div className={cn(`${isFilterToggle ? '' : 'hidden'}`, 'options')}>
        <div className={cn('option')}>
          <div className={cn('area')}>
            <p className={cn('label')}>지역</p>
            <div className={cn('cons')}>전체 서울 경기 강원</div>
          </div>
          <div className={cn('level')}>
            <p className={cn('label')}>코스 난이도</p>
            <div className={cn('cons')}>상 중 하</div>
          </div>
        </div>
        <div className={cn('tags')}></div>
        <div className={cn('btns')}>
          <button className={cn('btn', 'reset')} type="reset">
            초기화
          </button>
          <button className={cn('btn', 'submit')}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
