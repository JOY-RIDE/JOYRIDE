import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
import { SetterOrUpdater } from 'recoil';

const cn = classNames.bind(styles);

const PAGE_LIMIT = 5;
function getPageGroupIndex(page: number) {
  return Math.floor((page - 1) / PAGE_LIMIT);
}

interface PaginationProps {
  currentPage: number;
  setCurrentPage: SetterOrUpdater<number>;
  lastPage: number;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  lastPage,
}: PaginationProps) => {
  const totalPages = Array.from({ length: lastPage }, (_, index) => index + 1);

  const pageGroups: { [index: string]: number[] } = {};
  for (
    let pageGroupIndex = 0;
    pageGroupIndex <= getPageGroupIndex(lastPage);
    pageGroupIndex++
  ) {
    pageGroups[pageGroupIndex] = totalPages.slice(
      PAGE_LIMIT * pageGroupIndex,
      PAGE_LIMIT * pageGroupIndex + PAGE_LIMIT
    );
  }

  const getPageClickHandler = (page: number) => () => setCurrentPage(page);
  const handlePreviousClick = () =>
    setCurrentPage(page => PAGE_LIMIT * (getPageGroupIndex(page) - 1) + 1);
  const handleNextClick = () =>
    setCurrentPage(page => PAGE_LIMIT * (getPageGroupIndex(page) + 1) + 1);

  return (
    <nav className={cn('container')}>
      <button
        onClick={handlePreviousClick}
        disabled={!getPageGroupIndex(currentPage)}
      >
        &lt;
      </button>

      <div className={cn('pages')}>
        {pageGroups[getPageGroupIndex(currentPage)].map(page => (
          <span
            key={page}
            className={cn('page', { active: page === currentPage })}
            onClick={getPageClickHandler(page)}
          >
            {page}
          </span>
        ))}
      </div>

      <button
        onClick={handleNextClick}
        disabled={
          getPageGroupIndex(currentPage) === getPageGroupIndex(lastPage)
        }
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
