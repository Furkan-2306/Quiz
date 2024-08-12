import React from 'react';
import './Dropdown.css';

const Dropdown = ({ data, setQuestion_typeChange }) => {
  return (
    <div className="dropdown">
      <select onChange={e => setQuestion_typeChange(e.target.value)}>
        <option value="">Seçiniz</option> {/* Varsayılan boş seçenek */}
        {data.map((dt, i) => (
          <option key={i} value={dt}>{dt}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
