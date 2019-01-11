import React from "react";

const Select = ({ id, name, list, value, label, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      >
        {list.map(item => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
