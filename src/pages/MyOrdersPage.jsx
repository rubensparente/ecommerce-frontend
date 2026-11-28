import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { useCart } from '../contexts/CartContext';

const MyOrdersPage = () => {
  const { orders } = useCart();

  const formatBRL = (value) =>
    `R$ ${Number(value || 0).toFixed(2).replace('.', ',')}`;

  return (
    <Layout>
      <div className="container order-success-page">
        <h1 className="checkout-title">Meus Pedidos</h1>

        {orders.length === 0 ? (
          <div className="card-box order-success-card" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 22, marginBottom: 12, color: 'var(--dark-gray)' }}>
              Nenhum pedido encontrado.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--dark-gray-3)', marginBottom: 24 }}>
              Você ainda não realizou nenhuma compra na Digital Store.
            </p>
            <Link to="/produtos" className="login-btn" style={{ width: 220 }}>
              Explorar produtos
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div className="card-box" key={order.id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 12,
                  paddingBottom: 16,
                  borderBottom: '1px solid var(--light-gray-2)',
                  marginBottom: 16,
                }}
              >
                <div>
                  <strong style={{ fontSize: 16, color: 'var(--dark-gray)' }}>
                    Pedido {order.orderNumber}
                  </strong>
                  <p style={{ fontSize: 13, color: 'var(--light-gray)', marginTop: 4 }}>
                    Realizado em {order.createdAt}
                  </p>
                </div>

                <span
                  style={{
                    background: 'rgba(82, 202, 118, 0.15)',
                    color: '#2E8B57',
                    fontSize: 13,
                    fontWeight: 700,
                    padding: '6px 12px',
                    borderRadius: 20,
                  }}
                >
                  {order.status}
                </span>
              </div>

              <div className="summary-items">
                {order.items?.map((item, idx) => (
                  <div className="summary-item" key={`${order.id}-${idx}`}>
                    <div className="summary-item-thumb">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="summary-item-name">{item.name}</span>
                      <p style={{ fontSize: 13, color: 'var(--dark-gray-3)', marginTop: 2 }}>
                        Qtd: {item.quantity}
                        {item.size ? ` • Tam: ${item.size}` : ''}
                        {item.color ? ` • Cor: ${item.color}` : ''}
                      </p>
                    </div>
                    <strong style={{ fontSize: 14, color: 'var(--dark-gray)' }}>
                      {formatBRL((item.priceDiscount ?? item.price) * item.quantity)}
                    </strong>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 12,
                  fontSize: 14,
                  color: 'var(--dark-gray-3)',
                }}
              >
                <span>
                  Pagamento:{' '}
                  <strong style={{ color: 'var(--dark-gray)' }}>
                    {order.paymentMethod === 'credit'
                      ? 'Cartão de Crédito'
                      : 'Boleto Bancário'}
                  </strong>
                </span>
                <strong style={{ fontSize: 18, color: 'var(--primary)' }}>
                  Total: {formatBRL(order.total)}
                </strong>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default MyOrdersPage;