import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartModal = ({ onClose }) => {
  const { items, subtotal, clearCart } = useCart();

  return (
    <div className="cart-modal">
      <h4 style={{ marginBottom: 14, borderBottom: '1px solid #eee', paddingBottom: 10 }}>
        Meu Carrinho
      </h4>
      {items.length === 0 ? (
        <p style={{ fontSize: 14, color: 'var(--light-gray)', margin: '16px 0' }}>
          Seu carrinho está vazio.
        </p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            maxHeight: 220,
            overflowY: 'auto',
          }}
        >
          {items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 4 }}
              />
              <div style={{ fontSize: 13 }}>
                <strong style={{ display: 'block', color: 'var(--dark-gray)' }}>
                  {item.name}
                </strong>
                <span>
                  {item.quantity}x R$ {(item.priceDiscount ?? item.price).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '16px 0',
          paddingTop: 12,
          borderTop: '1px solid #eee',
          fontWeight: 700,
        }}
      >
        <span>Valor total:</span>
        <span style={{ color: 'var(--primary)' }}>R$ {subtotal.toFixed(2)}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          type="button"
          onClick={clearCart}
          style={{
            background: 'transparent',
            textDecoration: 'underline',
            color: 'var(--dark-gray-2)',
            fontSize: 13,
          }}
        >
          Esvaziar
        </button>
        <Link to="/cart" className="login-btn" style={{ width: 124 }} onClick={onClose}>
          Ver Carrinho
        </Link>
      </div>
    </div>
  );
};

export default CartModal;
