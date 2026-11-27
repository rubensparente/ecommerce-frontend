import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import Gallery from '../components/Gallery';
import Section from '../components/Section';
import ProductListing from '../components/ProductListing';
import { productsData } from '../data/products';

const heroSlides = [
  { src: '/home-slide-1.jpeg' },
  { src: '/home-slide-2.jpeg' },
  { src: '/home-slide-3.jpeg' },
  { src: '/home-slide-4.jpeg' },
  { src: '/home-slide-5.jpeg' },
  { src: '/home-slide-6.jpeg' },
  { src: '/home-slide-7.jpeg' },
  { src: '/home-slide-8.jpeg' },
];

const featuredCards = [
  { image: '/collection-1.png', alt: 'Novo drop Supreme', discount: '30% OFF' },
  { image: '/collection-2.png', alt: 'Coleção Adidas', discount: '30% OFF' },
  { image: '/collection-3.png', alt: 'Novo Beats Bass', discount: '30% OFF' },
];

const categoryIcons = [
  { label: 'Camisetas', icon: '👕', query: 'camiseta' },
  { label: 'Calças', icon: '👖', query: 'calca' },
  { label: 'Bonés', icon: '🧢', query: 'bone' },
  { label: 'Headphones', icon: '🎧', query: 'headphone' },
  { label: 'Tênis', icon: '👟', query: 'tenis' },
];

const HomePage = () => (
  <Layout>
    <div style={{ display: 'flex', justifyContent: 'center', background: '#F5F5F5' }}>
      <Gallery width="1440px" height="681px" images={heroSlides} />
    </div>

    <div className="container">
      <Section title="Coleções em destaque" titleAlign="left">
        <div className="collections-grid">
          {featuredCards.map((item, idx) => (
            <div className="collection-card collection-banner" key={idx}>
              <span className="discount-badge">{item.discount}</span>
              <img src={item.image} alt={item.alt} />
              <Link to="/produtos" className="collection-cta">
                Comprar
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Coleções em destaque" titleAlign="center">
        <div className="category-icons-row">
          {categoryIcons.map((cat) => (
            <Link
              key={cat.label}
              to={`/produtos?filter=${cat.query}`}
              className="category-icon-item"
            >
              <div className="category-circle">{cat.icon}</div>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="Produtos em alta"
        titleAlign="left"
        link={{ text: 'Ver todos', href: '/produtos' }}
      >
        <ProductListing products={productsData.slice(0, 8)} />
      </Section>
    </div>

    <section className="special-offer">
      <div className="container special-offer-grid">
        <div className="special-offer-img">
          <img src="/home-slide-4.jpeg" alt="Air Jordan edição de colecionador" />
        </div>
        <div className="special-offer-content">
          <span className="special-offer-tag">Oferta especial</span>
          <h2>Air Jordan edição de colecionador</h2>
          <p>
            Design clássico com acabamento premium, amortecimento de alto impacto e
            visual atemporal para completar sua coleção.
          </p>
          <Link to="/product/1" className="login-btn" style={{ width: 200 }}>
            Ver Oferta
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default HomePage;