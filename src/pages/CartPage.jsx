import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Section from '../components/Section';
import ProductListing from '../components/ProductListing';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { productsData } from '../data/products';

const CartPage = () => {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState('');
  const [cep, setCep] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const discount = subtotal > 0 ? (couponApplied ? 30.0 : 0) : 0;
  const shipping = 0;
  const total = Math.max(0, subtotal + shipping - discount);
  const installment = (total / 10).toFixed(2).replace('.', ',');

  const formatBRL = (value) =>
    `R$ ${Number(value || 0).toFixed(2).replace('.', ',')}`;

  const handleCepChange = (e) => {
    const formatted = e.target.value
      .replace(/\D/g, '')
      .slice(0, 8)
      .replace(/(\d{5})(\d{1,3})$/, '$1-$2');
    setCep(formatted);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim()) {
      setCouponApplied(true);
    }
  };

  const handleContinue = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  return (
    <Layout>
      <div className="container cart-page">
        <div className="cart-layout">
          {/* Coluna Esquerda — Itens do Carrinho */}
          <div className="card-box">
            <div className="cart-header-row">
              <h3 className="cart-col-title">MEU CARRINHO</h3>
              <span className="cart-col-label">QUANTIDADE</span>
              <span className="cart-col-label">UNITÁRIO</span>
              <span className="cart-col-label">TOTAL</span>
            </div>

            {items.length === 0 ? (
              <div className="cart-empty">
                <p>Seu carrinho está vazio.</p>
                <Link to="/produtos" className="login-btn" style={{ width: 200 }}>
                  Explorar produtos
                </Link>
              </div>
            ) : (
              items.map((item, idx) => {
                const unitPrice = item.priceDiscount ?? item.price;
                const itemTotal = unitPrice * item.quantity;

                return (
                  <div className="cart-item-row" key={`${item.id}-${idx}`}>
                    <div className="cart-item-info">
                      <div className="cart-item-thumb">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        {item.color && (
                          <p>
                            <span>Cor:</span> {item.color}
                          </p>
                        )}
                        {item.size && (
                          <p>
                            <span>Tamanho:</span> {item.size}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="cart-item-qty">
                      <div className="qty-control">
                        <button
                          type="button"
                          aria-label="Diminuir quantidade"
                          onClick={() =>
                            updateQuantity
                              ? updateQuantity(item.id, item.quantity - 1)
                              : null
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Aumentar quantidade"
                          onClick={() =>
                            updateQuantity
                              ? updateQuantity(item.id, item.quantity + 1)
                              : null
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cart-remove-btn"
                        onClick={() =>
                          removeFromCart ? removeFromCart(item.id) : null
                        }
                      >
                        Remover item
                      </button>
                    </div>

                    <div className="cart-item-price">
                      {item.priceDiscount && (
                        <span className="cart-price-old">
                          {formatBRL(item.price)}
                        </span>
                      )}
                      <strong>{formatBRL(unitPrice)}</strong>
                    </div>

                    <div className="cart-item-price">
                      {item.priceDiscount && (
                        <span className="cart-price-old">
                          {formatBRL(item.price * item.quantity)}
                        </span>
                      )}
                      <strong>{formatBRL(itemTotal)}</strong>
                    </div>
                  </div>
                );
              })
            )}

            {/* Cupom e Frete */}
            <div className="cart-extras-grid">
              <form className="cart-extra-box" onSubmit={handleApplyCoupon}>
                <label htmlFor="cart-coupon">Cupom de desconto</label>
                <div className="cart-extra-input-row">
                  <input
                    id="cart-coupon"
                    type="text"
                    placeholder="Insira seu código"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button type="submit" className="cart-extra-btn">
                    OK
                  </button>
                </div>
              </form>

              <div className="cart-extra-box">
                <label htmlFor="cart-cep">Calcular frete</label>
                <div className="cart-extra-input-row">
                  <input
                    id="cart-cep"
                    type="text"
                    inputMode="numeric"
                    maxLength={9}
                    placeholder="Insira seu CEP"
                    value={cep}
                    onChange={handleCepChange}
                  />
                  <button type="button" className="cart-extra-btn">
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita — Resumo */}
          <aside className="card-box">
            <h3 className="checkout-card-title">RESUMO</h3>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal:</span>
                <strong>{formatBRL(subtotal)}</strong>
              </div>
              <div className="summary-row">
                <span>Frete:</span>
                <strong>{formatBRL(shipping)}</strong>
              </div>
              <div className="summary-row">
                <span>Desconto:</span>
                <strong>{formatBRL(discount)}</strong>
              </div>
            </div>

            <div className="summary-total-box">
              <div className="summary-total-line">
                <strong>Total</strong>
                <strong className="checkout-total-pink">
                  {formatBRL(total)}
                </strong>
              </div>
              <p className="summary-installments">
                ou 10x de R$ {installment} sem juros
              </p>
            </div>

            <button
              type="button"
              className="warning-btn"
              disabled={items.length === 0}
              onClick={handleContinue}
            >
              Continuar
            </button>
          </aside>
        </div>

        <Section
          title="Produtos Relacionados"
          titleAlign="left"
          link={{ text: 'Ver todos', href: '/produtos' }}
        >
          <ProductListing products={productsData.slice(0, 4)} />
        </Section>
      </div>
    </Layout>
  );
};

export default CartPage;