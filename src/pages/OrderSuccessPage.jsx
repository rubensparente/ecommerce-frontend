import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { useCart } from '../contexts/CartContext';

const OrderSuccessPage = () => {
  const { lastOrder } = useCart();

  const formatBRL = (value) =>
    `R$ ${Number(value || 0).toFixed(2).replace('.', ',')}`;

  if (!lastOrder) {
    return (
      <Layout>
        <div className="container order-success-page">
          <div className="card-box order-success-card" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 24, marginBottom: 12, color: 'var(--dark-gray)' }}>
              Nenhum pedido encontrado.
            </h1>
            <p style={{ fontSize: 15, color: 'var(--dark-gray-3)', marginBottom: 24 }}>
              Você ainda não realizou nenhuma compra na Digital Store.
            </p>
            <Link to="/produtos" className="login-btn" style={{ width: 220 }}>
              Explorar produtos
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const installment = (lastOrder.total / 10).toFixed(2).replace('.', ',');
  const maskedCard = lastOrder.cardNumber
    ? `**** **** **** ${lastOrder.cardNumber.slice(-4)}`
    : '**** **** **** 0000';

  return (
    <Layout>
      <div className="container order-success-page">
        <div className="card-box order-success-card">
          <div className="order-success-header">
            <span className="order-success-emoji" role="img" aria-label="Sucesso">
              🎉
            </span>
            <h1>
              Compra Realizada
              <br />
              com sucesso!
            </h1>
          </div>

          <div className="order-section">
            <h3>Informações Pessoais</h3>
            <p>
              Nome: <strong>{lastOrder.name}</strong>
            </p>
            <p>
              CPF: <strong>{lastOrder.cpf}</strong>
            </p>
            <p>
              Email: <strong>{lastOrder.email}</strong>
            </p>
            <p>
              Celular: <strong>{lastOrder.phone}</strong>
            </p>
          </div>

          <div className="order-section">
            <h3>Informações de Entrega</h3>
            <p>
              Endereço: <strong>{lastOrder.address}</strong>
            </p>
            <p>
              Bairro: <strong>{lastOrder.neighborhood}</strong>
            </p>
            <p>
              Cidade: <strong>{lastOrder.city}</strong>
            </p>
            <p>
              CEP: <strong>{lastOrder.cep}</strong>
            </p>
            {lastOrder.complement && (
              <p>
                Complemento: <strong>{lastOrder.complement}</strong>
              </p>
            )}
          </div>

          <div className="order-section">
            <h3>Informações de Pagamento</h3>
            {lastOrder.paymentMethod === 'credit' ? (
              <>
                <p>
                  Titular do Cartão: <strong>{lastOrder.cardName}</strong>
                </p>
                <p>
                  Final: <strong>{maskedCard}</strong>
                </p>
              </>
            ) : (
              <p>
                Forma de Pagamento: <strong>Boleto Bancário</strong>
              </p>
            )}
          </div>

          <div className="order-section order-section-last">
            <h3>Resumo da compra</h3>
            <div className="summary-items">
              {lastOrder.items?.map((item, idx) => (
                <div className="summary-item" key={idx}>
                  <div className="summary-item-thumb">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <span className="summary-item-name">{item.name}</span>
                </div>
              ))}
            </div>

            <div className="summary-total-box">
              <div className="summary-total-line">
                <strong>Total</strong>
                <strong>{formatBRL(lastOrder.total)}</strong>
              </div>
              <p className="summary-installments">
                ou 10x de R$ {installment} sem juros
              </p>
            </div>

            <div className="order-print-wrap">
              <button
                type="button"
                className="order-print-btn"
                onClick={() => window.print()}
              >
                Imprimir Recibo
              </button>
            </div>
          </div>

          <Link to="/" className="warning-btn" style={{ marginTop: 16 }}>
            Voltar para Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccessPage;