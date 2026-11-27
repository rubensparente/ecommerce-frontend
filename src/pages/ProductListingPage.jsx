import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from './Layout';
import ProductListing from '../components/ProductListing';
import FilterGroup from '../components/FilterGroup';
import { productsData } from '../data/products';

const normalizeText = (str = '') =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/-/g, ' ')
    .toLowerCase()
    .trim();

const brandOptions = ['Adidas', 'Balenciaga', 'K-Swiss', 'Nike', 'Puma'];
const categoryOptions = ['Esporte e lazer', 'Casual', 'Utilitário', 'Corrida'];

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const filterQuery = searchParams.get('filter') || '';
  const categoryQuery = searchParams.get('category') || '';
  const brandQuery = searchParams.get('brand') || '';

  const [sortOrder, setSortOrder] = useState('relevant');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState('');

  useEffect(() => {
    const matchedBrand = brandOptions.find(
      (b) => normalizeText(b) === normalizeText(brandQuery)
    );
    const matchedCategory = categoryOptions.find(
      (c) => normalizeText(c) === normalizeText(categoryQuery)
    );

    setSelectedBrands(matchedBrand ? [matchedBrand] : []);
    setSelectedCategories(matchedCategory ? [matchedCategory] : []);
  }, [brandQuery, categoryQuery]);

  const toggleMulti = (setter) => (val) =>
    setter((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );

  const filteredProducts = useMemo(() => {
    const q = normalizeText(filterQuery);

    const list = productsData.filter((p) => {
      const matchesQuery =
        !q ||
        normalizeText(p.name).includes(q) ||
        normalizeText(p.category).includes(q) ||
        normalizeText(p.brand).includes(q);
      const matchesBrand =
        !selectedBrands.length || selectedBrands.includes(p.brand);
      const matchesCategory =
        !selectedCategories.length || selectedCategories.includes(p.category);
      const matchesGender =
        !selectedGenders.length || selectedGenders.includes(p.gender);
      const matchesCondition =
        !selectedCondition || p.condition === selectedCondition;
      return (
        matchesQuery &&
        matchesBrand &&
        matchesCategory &&
        matchesGender &&
        matchesCondition
      );
    });

    if (sortOrder === 'asc') {
      return [...list].sort(
        (a, b) => (a.priceDiscount ?? a.price) - (b.priceDiscount ?? b.price)
      );
    }
    if (sortOrder === 'desc') {
      return [...list].sort(
        (a, b) => (b.priceDiscount ?? b.price) - (a.priceDiscount ?? a.price)
      );
    }
    return list;
  }, [
    filterQuery,
    selectedBrands,
    selectedCategories,
    selectedGenders,
    selectedCondition,
    sortOrder,
  ]);

  return (
    <Layout>
      <div className="container listing-page">
        <div className="listing-topbar">
          <p className="listing-results-text">
            {filterQuery ? (
              <>
                <strong>Resultados para &ldquo;{filterQuery}&rdquo;</strong>
                <span> &ndash; {filteredProducts.length} produtos</span>
              </>
            ) : (
              <>
                <strong>Todos os produtos</strong>
                <span> &ndash; {filteredProducts.length} produtos</span>
              </>
            )}
          </p>

          <div className="sort-inline-box">
            <label htmlFor="sort-select">Ordenar por:</label>
            <select
              id="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="relevant">mais relevantes</option>
              <option value="asc">menor preço</option>
              <option value="desc">maior preço</option>
            </select>
          </div>
        </div>

        <div className="listing-layout">
          <aside className="filter-panel">
            <h3 className="filter-panel-title">Filtrar por</h3>
            <FilterGroup
              title="Marca"
              inputType="checkbox"
              options={brandOptions.map((text) => ({ text }))}
              selected={selectedBrands}
              onChange={toggleMulti(setSelectedBrands)}
            />
            <FilterGroup
              title="Categoria"
              inputType="checkbox"
              options={categoryOptions.map((text) => ({ text }))}
              selected={selectedCategories}
              onChange={toggleMulti(setSelectedCategories)}
            />
            <FilterGroup
              title="Gênero"
              inputType="checkbox"
              options={[
                { text: 'Masculino' },
                { text: 'Feminino' },
                { text: 'Unissex' },
              ]}
              selected={selectedGenders}
              onChange={toggleMulti(setSelectedGenders)}
            />
            <FilterGroup
              title="Estado"
              inputType="radio"
              options={[{ text: 'Novo' }, { text: 'Usado' }]}
              selected={selectedCondition}
              onChange={setSelectedCondition}
            />
          </aside>

          <div className="listing-grid-wrap">
            <ProductListing products={filteredProducts} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListingPage;