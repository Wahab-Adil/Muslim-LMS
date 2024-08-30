import { useState, useEffect } from "react";
import "./paginate.css";
import ReactPaginate from "react-paginate";

export default function CircularPagination({
  FilterData,
  setCurrentItems,
  itemsPerPage,
}) {
  //   Begin Pagination

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(FilterData?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(FilterData?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, FilterData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % FilterData?.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  return (
    <div className="flex items-center gap-4">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      />
    </div>
  );
}
