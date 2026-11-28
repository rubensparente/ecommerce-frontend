import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, image, name, category, price, priceDiscount }) => {
  const formatBRL = (value) =>
    `R$ ${Number(value || 0).toFixed(2).replace('.', ',')}`;

  const discountPercent =
    priceDiscount && price > priceDiscount
      ? Math.round(((price - priceDiscount) / price) * 100)
      : null;

  return (
    <Link to={`/produto/${id}`} className="product-card">
      <div className="product-card-img-wrap">
        {discountPercent && (
          <span className="discount-badge">{discountPercent}% OFF</span>
        )}
        <img src={image} alt={name} />
      </div>

      {category && <span className="product-card-category">{category}</span>}
      <h3 className="product-card-name">{name}</h3>

      <div className="product-card-prices">
        {priceDiscount ? (
          <>
            <span className="price-crossed">{formatBRL(price)}</span>
            <span className="price-regular">{formatBRL(priceDiscount)}</span>
          </>
        ) : (
          <span className="price-regular">{formatBRL(price)}</span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;