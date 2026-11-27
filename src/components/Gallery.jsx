import React, { useState } from 'react';
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';

const Gallery = ({
  className = '',
  width = '100%',
  height = '500px',
  radius = '0px',
  showThumbs = false,
  images = [],
}) => {
  const [current, setCurrent] = useState(0);

  if (!images.length) return null;

  const isFirst = current === 0;
  const isLast = current === images.length - 1;

  const normalizeSize = (val) =>
    typeof val === 'number' || /^\d+$/.test(String(val)) ? `${val}px` : val;

  return (
    <div
      className={`gallery-wrapper ${className}`}
      style={{ maxWidth: normalizeSize(width) }}
    >
      <div
        className="gallery-viewport"
        style={{ height: normalizeSize(height), borderRadius: radius }}
      >
        <div
          className="gallery-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div className="gallery-slide" key={idx}>
              <img src={img.src} alt={`Slide ${idx + 1}`} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="gallery-arrow left"
          disabled={isFirst}
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          aria-label="Anterior"
        >
          <img src={arrowLeft} alt="Anterior" width={14} height={24} />
        </button>
        <button
          type="button"
          className="gallery-arrow right"
          disabled={isLast}
          onClick={() => setCurrent((c) => Math.min(images.length - 1, c + 1))}
          aria-label="Próximo"
        >
          <img src={arrowRight} alt="Próximo" width={14} height={24} />
        </button>
      </div>

      {showThumbs && (
        <div className="gallery-thumbs">
          {images.map((img, idx) => (
            <button
              type="button"
              key={idx}
              className={`gallery-thumb ${idx === current ? 'active' : ''}`}
              style={{ borderRadius: radius }}
              onClick={() => setCurrent(idx)}
            >
              <img src={img.src} alt={`Miniatura ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
