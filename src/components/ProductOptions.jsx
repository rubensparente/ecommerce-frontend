import React, { useState } from 'react';

const ProductOptions = ({
  options = [],
  radius = '4px',
  shape = 'square',
  type = 'text',
  onSelect,
}) => {
  const [selected, setSelected] = useState(options[0] ?? null);

  const handlePick = (opt) => {
    setSelected(opt);
    if (onSelect) onSelect(opt);
  };

  return (
    <div className="options-group">
      {options.map((opt, idx) => (
        <button
          type="button"
          key={idx}
          onClick={() => handlePick(opt)}
          className={`option-item ${shape} ${type} ${selected === opt ? 'selected' : ''}`}
          style={{
            borderRadius: shape === 'square' ? radius : '50%',
            backgroundColor: type === 'color' ? opt : undefined,
          }}
          aria-label={`Opção ${opt}`}
        >
          {type === 'text' ? opt : ''}
        </button>
      ))}
    </div>
  );
};

export default ProductOptions;
