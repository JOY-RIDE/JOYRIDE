import Pagination from 'react-js-pagination';
import './Paging.css';

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

const Paging = ({ total, limit, page, setPage }: PaginationProps) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={limit}
      totalItemsCount={total}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={setPage}
    />
  );

  //   const numOfPages = Math.ceil(total / limit);
  //   const pageNumbers = [];
  //   for (let i = 1; i <= numOfPages; i++) {
  //     pageNumbers.push(i);
  //   }

  //   return (
  //     <nav>
  //       <button onClick={() => setPage(page - 1)} disabled={page === 1}>
  //         &lt;
  //       </button>
  //       {pageNumbers.map((_, i) => (
  //         <button key={i + 1} onClick={() => setPage(i + 1)}>
  //           {i + 1}
  //         </button>
  //       ))}
  //       <button onClick={() => setPage(page + 1)} disabled={page === numOfPages}>
  //         &gt;
  //       </button>
  //     </nav>
  //   );
};

export default Paging;
