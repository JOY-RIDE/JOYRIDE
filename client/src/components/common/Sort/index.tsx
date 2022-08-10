import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sort.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineDown } from 'react-icons/ai';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

const cn = classNames.bind(styles);

interface SortProps {
  sortOptionData: Array<string>;
  setCurrentSort: (currentSort: string) => void;
  currentSort: string;
}

const Sort = ({ sortOptionData, setCurrentSort, currentSort }: SortProps) => {
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  // 1)
  const [isSortActive, setIsSortActive] = useState(false);
  const clickOutsidehandler = () => {
    setIsSortActive(false);
  };
  useOnClickOutside(sortDropdownRef, clickOutsidehandler);

  return (
    <div className={styles.sort} ref={sortDropdownRef}>
      <button
        className={cn('select')}
        onClick={() => {
          setIsSortActive(!isSortActive);
        }}
      >
        <span>{currentSort}</span>
        <AiOutlineDown />
      </button>
      <ul className={cn(`${isSortActive ? '' : 'hidden'}`, 'options')}>
        {sortOptionData?.map(option => (
          <li
            className={cn('option')}
            key={option}
            onClick={() => {
              setCurrentSort(option);
              setIsSortActive(false);
            }}
          >
            <Link to={`?sort_by=${option}`}>{option}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sort;
