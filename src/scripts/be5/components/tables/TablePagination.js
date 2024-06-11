import React from 'react';
import PropTypes from 'prop-types';
import Pagination from "react-js-pagination";
import be5 from '../../be5';
import { openTablePage } from "../../services/tables";

const TablePagination = (props) => {
  const { value, frontendParams, innerClass, showAlways } = props;
  const attr = value.data.attributes;

  const handlePageChange = (pageNumber) => {
    openTablePage(attr, frontendParams, pageNumber);
  };

  if (attr.totalNumberOfRows <= attr.length && !showAlways) return null;

  const currentPage = attr.offset / attr.length + 1;

  return (
    <Pagination
      prevPageText={be5.messages.table.previousPage}
      nextPageText={be5.messages.table.nextPage}
      firstPageText={be5.messages.table.firstPage}
      lastPageText={be5.messages.table.lastPage}
      activePage={currentPage}
      itemsCountPerPage={attr.length}
      totalItemsCount={attr.totalNumberOfRows}
      onChange={handlePageChange}
      innerClass={innerClass}
      itemClass="page-item"
      linkClass="page-link"
      activeLinkClass=""
    />
  );
};

TablePagination.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired,
  innerClass: PropTypes.string,
  showAlways: PropTypes.bool
};

TablePagination.defaultProps = {
  showAlways: false
};

export default TablePagination;
