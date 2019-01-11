import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="input-group mb-3">
      <input
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        type="text"
        className="form-control"
      />
      <div className="input-group-append">
        <span className="input-group-text" id="basic-addon2">
          Search
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
