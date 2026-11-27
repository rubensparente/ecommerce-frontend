import React from 'react';

const FilterGroup = ({
  title,
  inputType = 'checkbox',
  options = [],
  selected = [],
  onChange,
}) => {
  const nameAttr = `filter-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="filter-group">
      <h4 className="filter-group-title">{title}</h4>
      {options.map((opt, idx) => {
        const val = opt.value ?? opt.text;
        const isChecked = Array.isArray(selected)
          ? selected.includes(val)
          : selected === val;

        return (
          <label key={idx} className="filter-option">
            <input
              type={inputType}
              name={nameAttr}
              value={val}
              checked={isChecked}
              onChange={() => onChange && onChange(val)}
            />
            <span>{opt.text}</span>
          </label>
        );
      })}
    </div>
  );
};

export default FilterGroup;
