import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class Pagination extends Component {
  render() {
    const { itemCount, pageSize, currentPage, onPageChange } = this.props;
    const pageCount = Math.ceil(itemCount / pageSize);

    if (pageCount === 1) return null;

    const pageArray = _.range(1, pageCount + 1);

    return (
      <nav aria-label="Table pages">
        <ul className="pagination">
          {pageArray.map(page => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
