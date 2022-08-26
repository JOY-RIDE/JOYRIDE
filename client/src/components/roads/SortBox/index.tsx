import React, { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styles from './SortBox.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { isCourseSortActiveState } from 'states/common';
import SortItem from '../SortItem';

const cn = classNames.bind(styles);

const SortBox = () => {
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const [isSortActive, setIsSortActive] = useRecoilState(
    isCourseSortActiveState
  );
  const clickOutsidehandler = () => {
    setIsSortActive(false);
  };
  useOnClickOutside(sortDropdownRef, clickOutsidehandler);

  const [currentSort, setCurrentSort] = useState('가나다순');

  return (
    <div className={styles.sort} ref={sortDropdownRef}>
      <button
        className={cn('select')}
        onClick={() => {
          setIsSortActive(!isSortActive);
        }}
      >
        <span>{currentSort}</span>
        {isSortActive ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>
      <ul className={cn(`${isSortActive ? '' : 'hidden'}`, 'options')}>
        <SortItem
          setCurrentSort={setCurrentSort}
          currentSort={'가나다순'}
        ></SortItem>
        <SortItem
          setCurrentSort={setCurrentSort}
          currentSort={'짧은시간순'}
        ></SortItem>
        <SortItem
          setCurrentSort={setCurrentSort}
          currentSort={'긴시간순'}
        ></SortItem>
        <SortItem
          setCurrentSort={setCurrentSort}
          currentSort={'짧은길이순'}
        ></SortItem>
        <SortItem
          setCurrentSort={setCurrentSort}
          currentSort={'긴길이순'}
        ></SortItem>
        <SortItem
          setCurrentSort={setCurrentSort}
          currentSort={'좋아요순'}
        ></SortItem>
        <SortItem
          setCurrentSort={setCurrentSort}
          currentSort={'평점순'}
        ></SortItem>
      </ul>
    </div>
  );
};

export default SortBox;
