import React from 'react';
import ProductCard from './ProductCard';

const ProductListing = ({ products = [] }) => (
  <div className="product-grid">
    {products.map((product, idx) => (
      <ProductCard
        key={product.id ?? idx}
        id={product.id ?? idx + 1}
        image={product.image}
        name={product.name}
        category={product.category}
        price={product.price}
        priceDiscount={product.priceDiscount}
      />
    ))}
  </div>
);

export default ProductListing;
