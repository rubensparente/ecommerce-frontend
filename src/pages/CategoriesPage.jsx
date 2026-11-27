import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import Section from '../components/Section';
import { productsData } from '../data/products';

const categoriesConfig = [
  {
    name: 'Esporte e lazer',
    slug: 'esporte-e-lazer',
    description: 'Conforto para treinar, caminhar e aproveitar o fim de semana.',
    image: '/product-thumb-5.jpeg',
  },
  {
    name: 'Casual',
    slug: 'casual',
    description: 'Clássicos que combinam com qualquer look do dia a dia.',
    image: '/product-thumb-3.jpeg',
  },
  {
    name: 'Utilitário',
    slug: 'utilitario',
    description: 'Modelos robustos, com solado reforçado e muito estilo.',
    image: '/produc-image-1.jpeg',
  },
  {
    name: 'Corrida',
    slug: 'corrida',
    description: 'Leveza e amortecimento para render mais em cada passada.',
    image: '/product-thumb-2.jpeg',
  },
];

const brandsList = [
  { name: 'Adidas', slug: 'adidas' },
  { name: 'Balenciaga', slug: 'balenciaga' },
  { name: 'K-Swiss', slug: 'k-swiss' },
  { name: 'Nike', slug: 'nike' },
  { name: 'Puma', slug: 'puma' },
];

const CategoriesPage = () => {
  const countByCategory = (catName) =>
    productsData.filter((p) => p.category === catName).length;

  const countByBrand = (brandName) =>
    productsData.filter((p) => p.brand === brandName).length;

  return (
    <Layout>
      <div className="container">
        <Section
          title="Categorias"
          titleAlign="left"
          link={{ text: 'Ver todos os produtos', href: '/produtos' }}
        >
          <div className="categories-grid">
            {categoriesConfig.map((cat) => {
              const total = countByCategory(cat.name);
              return (
                <Link
                  key={cat.name}
                  to={`/produtos?category=${cat.slug}`}
                  className="category-card"
                >
                  <div className="category-card-img">
                    <img src={cat.image} alt={cat.name} />
                  </div>
                  <div className="category-card-body">
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
                    <div className="category-card-footer">
                      <span className="category-count">
                        {total} {total === 1 ? 'produto' : 'produtos'}
                      </span>
                      <span className="category-link">Ver produtos &rarr;</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Section>

        <Section title="Marcas" titleAlign="center">
          <div className="brands-row">
            {brandsList.map((brand) => (
              <Link
                key={brand.name}
                to={`/produtos?brand=${brand.slug}`}
                className="brand-pill"
              >
                <span>{brand.name}</span>
                <span className="brand-count">{countByBrand(brand.name)}</span>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  );
};

export default CategoriesPage;