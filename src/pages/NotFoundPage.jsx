import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

const NotFoundPage = () => (
  <Layout>
    <div className="container not-found-page">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Página em construção</h2>
      <p className="not-found-text">Esta página ainda não faz parte da loja.</p>
      <Link to="/" className="not-found-btn">
        Voltar para a Home
      </Link>
    </div>
  </Layout>
);

export default NotFoundPage;