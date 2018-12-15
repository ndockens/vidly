import React, { Component } from "react";
import PropTypes from "prop-types";

class ListGroup extends Component {
  render() {
    const {
      items,
      selectedItem,
      onItemSelect,
      keyProperty,
      valueProperty
    } = this.props;

    return (
      <div className="list-group">
        {items.map(item => (
          <button
            key={item[keyProperty]}
            type="button"
            className={
              item[keyProperty] === selectedItem[keyProperty]
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action clickable"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[valueProperty]}
          </button>
        ))}
      </div>
    );
  }
}

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.object.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  keyProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired
};

ListGroup.defaultProps = {
  keyProperty: "_id",
  valueProperty: "name"
};

export default ListGroup;
