import React, { Component } from "react";

class TableBody extends Component {
  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item["_id"]}>
            {columns.map(column => (
              <td key={column.key}>{column.getContent(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
