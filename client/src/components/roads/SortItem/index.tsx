import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styles from './SortItem.module.scss';
import classNames from 'classnames/bind';
import { isCourseSortActiveState } from 'states/common';

const cn = classNames.bind(styles);

interface SortProps {
  setCurrentSort: (currentSort: string) => void;
  currentSort: string;
  //   onClickOpt: () => void;
}

const SortItem = ({ setCurrentSort, currentSort }: SortProps) => {
  const setIsSortActive = useSetRecoilState(isCourseSortActiveState);

  return (
    <Link
      className={styles.option}
      to={
        currentSort !== '가나다순'
          ? `&sort_by=${JSON.stringify(currentSort).replace(/\"/gi, '')}`
          : '/roads'
      }
      onClick={() => {
        setCurrentSort(currentSort);
        setIsSortActive(false);
      }}
      //   onClick={onClick}
    >
      <li key={currentSort}>{currentSort}</li>
    </Link>
  );
};

export default SortItem;
