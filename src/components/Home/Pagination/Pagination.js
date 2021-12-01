// Librairies
import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Pagination = ({ page, count, handlePageClick }) => {
  // Variables
  let pageCount = count / 20;

  return (
    <div className="react-paginate">
      <ReactPaginate
        previousLabel={"<"}
        previousClassName={"previous-page"}
        nextLabel={">"}
        nextClassName={"next-page"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        forcePage={page - 1}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Pagination;
