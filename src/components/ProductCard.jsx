import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, image, name, category, price, priceDiscount }) => {
  const discountPct =
    priceDiscount && price > priceDiscount
      ? Math.round(((price - priceDiscount) / price) * 100)
      : null;

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-card-img-wrap">
        {discountPct && <span className="discount-badge">{discountPct}% OFF</span>}
        <img src={image} alt={name} />
      </div>
      {category && <span className="product-card-category">{category}</span>}
      <h3 className="product-card-name">{name}</h3>
      <div className="product-card-prices">
        {priceDiscount ? (
          <>
            <span className="price-crossed">R$ {price.toFixed(2)}</span>
            <span className="price-regular">R$ {priceDiscount.toFixed(2)}</span>
          </>
        ) : (
          <span className="price-regular">R$ {price.toFixed(2)}</span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
