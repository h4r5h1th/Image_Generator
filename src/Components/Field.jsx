import React from 'react';
import './Field.css'; // Import the CSS file

const Field = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div className="Field_container">
    <label
      htmlFor={name}
      className="Field_label"
    >
      {labelName}
    </label>
    {isSurpriseMe && (
      <button
        type="button"
        onClick={handleSurpriseMe}
        className="Field_surprise-btn"
      >
        Surprise me
      </button>
    )}
    <input
      type={type}
      id={name}
      name={name}
      className="Field_input"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default Field;
