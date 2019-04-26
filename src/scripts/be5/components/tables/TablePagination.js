import React from 'react';
import PropTypes from 'prop-types';
import Pagination from "react-js-pagination";
import be5 from '../../be5';
import {openTablePage} from "../../services/tables";


class TablePagination extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    openTablePage(this.props.value.data.attributes, this.props.frontendParams, pageNumber)
  }
  
  render() {
    const attr = this.props.value.data.attributes;
    const currentPage = attr.offset / attr.length + 1;
    return (
      <div>
        <Pagination
          prevPageText={be5.messages.table.previousPage}
          nextPageText={be5.messages.table.nextPage}
          firstPageText={be5.messages.table.firstPage}
          lastPageText={be5.messages.table.lastPage}
          activePage={currentPage}
          itemsCountPerPage={attr.length}
          totalItemsCount={attr.totalNumberOfRows}
          onChange={this.handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          activeLinkClass=""
        />
      </div>
    );
  }
}

TablePagination.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};

export default TablePagination;