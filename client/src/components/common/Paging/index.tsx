import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Paging.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

const Paging = ({ total, limit, page, setPage }: PaginationProps) => {
  const numPages = Math.ceil(total / limit);
  //   const [totalPage, setTotalPage] = useState<number[]>([]);
  //   const [currentPage, setCurrentPage] = useState(1);

  //   const numOfPages = Math.ceil(total / limit);
  const pageNumbers = [];
  for (let i = 1; i <= numPages; i++) {
    pageNumbers.push(i);
  }
  //   setTotalPage(pageNumbers);

  let pageArr: number[][] = [];
  for (let i = 0; i < pageNumbers.length; i += 5) {
    pageArr.push(pageNumbers.slice(i, i + 5));
  }

  const [index, setIndex] = useState(Math.floor((page - 1) / 5));
  const [pageGroup, setPageGroup] = useState(
    pageArr[Math.floor((page - 1) / 5)]
  );

  return (
    <nav className={styles.paging}>
      <button
        onClick={() => {
          if (index >= 0) {
            setIndex(index - 1);
            setPageGroup(pageArr[index - 1]);
          }
        }}
        disabled={index === 0}
      >
        &lt;
      </button>
      {pageGroup &&
        pageGroup.map(p => (
          <Link
            to={`?page=${p}`}
            key={p}
            onClick={() => {
              setPage(p);
            }}
            className={p === page ? cn('active') : cn('page')}
          >
            {p}
          </Link>
        ))}
      <button
        onClick={() => {
          if (index <= Math.ceil(numPages / 5) - 1) {
            setIndex(index + 1);
            setPageGroup(pageArr[index + 1]);
          }
        }}
        disabled={index === Math.ceil(numPages / 5) - 1}
      >
        &gt;
      </button>
    </nav>
  );
};

export default Paging;
