import React from 'react';
import starIcon from '../assets/star-icon.svg';

const BuyBox = ({
  name,
  reference,
  stars,
  rating,
  price,
  priceDiscount,
  description,
  children,
  onBuy,
}) => (
  <div>
    <h1 className="buybox-name">{name}</h1>
    <p className="buybox-ref">{reference}</p>

    <div className="buybox-rating-row">
      <span className="stars-badge">
        {stars}
        <img
          src={starIcon}
          alt="Estrela"
          width={14}
          height={14}
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </span>
      <span className="rating-count">({rating} avaliações)</span>
    </div>

    <div className="buybox-prices">
      {priceDiscount ? (
        <>
          <span className="buybox-price-main">R$ {priceDiscount.toFixed(2)}</span>
          <span className="buybox-price-old">R$ {price.toFixed(2)}</span>
        </>
      ) : (
        <span className="buybox-price-main">R$ {price.toFixed(2)}</span>
      )}
    </div>

    <p className="buybox-desc">{description}</p>

    {children}

    <button type="button" className="buy-cta-btn" onClick={onBuy}>
      COMPRAR
    </button>
  </div>
);

export default BuyBox;
