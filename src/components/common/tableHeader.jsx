import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    let order = "asc";
    if (path === this.props.sortColumn.path)
      order = this.props.sortColumn.order === "asc" ? "desc" : "asc";

    this.props.onSort({ path, order });
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;

    return sortColumn.order === "asc" ? (
      <i className="fa fa-sort-asc" aria-hidden="true" />
    ) : (
      <i className="fa fa-sort-desc" aria-hidden="true" />
    );
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.key}
              className="clickable"
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
