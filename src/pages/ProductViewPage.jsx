import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from './Layout';
import Gallery from '../components/Gallery';
import BuyBox from '../components/BuyBox';
import ProductOptions from '../components/ProductOptions';
import Section from '../components/Section';
import ProductListing from '../components/ProductListing';
import { productsData } from '../data/products';
import { useCart } from '../contexts/CartContext';

const ProductViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product =
    productsData.find((p) => String(p.id) === String(id)) || productsData[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const handleBuy = () => {
    addToCart(product, selectedSize, selectedColor);
    navigate('/cart');
  };

  const related = productsData.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <div className="container">
        <div className="product-view-grid">
          <Gallery
            images={product.images}
            showThumbs
            width="700px"
            height="570px"
            radius="4px"
          />

          <BuyBox
            name={product.name}
            reference={product.reference}
            stars={product.stars}
            rating={product.rating}
            price={product.price}
            priceDiscount={product.priceDiscount}
            description={product.description}
            onBuy={handleBuy}
          >
            <strong style={{ fontSize: 14, color: 'var(--light-gray)' }}>
              Tamanho
            </strong>
            <ProductOptions
              options={product.sizes}
              radius="4px"
              shape="square"
              type="text"
              onSelect={setSelectedSize}
            />

            <strong style={{ fontSize: 14, color: 'var(--light-gray)' }}>
              Cor
            </strong>
            <ProductOptions
              options={product.colors}
              shape="circle"
              type="color"
              onSelect={setSelectedColor}
            />
          </BuyBox>
        </div>

        <Section
          title="Produtos recomendados"
          titleAlign="left"
          link={{ text: 'Ver todos', href: '/products' }}
        >
          <ProductListing products={related} />
        </Section>
      </div>
    </Layout>
  );
};

export default ProductViewPage;
