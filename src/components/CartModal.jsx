import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartModal = ({ onClose }) => {
  const { items, subtotal, clearCart } = useCart();

  const formatBRL = (value) =>
    `R$ ${Number(value || 0).toFixed(2).replace('.', ',')}`;

  return (
    <div className="cart-modal">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 14,
          borderBottom: '1px solid var(--light-gray-2)',
          marginBottom: 16,
        }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark-gray)' }}>
          Meu Carrinho
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar carrinho"
          style={{
            background: 'transparent',
            fontSize: 18,
            color: 'var(--dark-gray-3)',
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      {items.length === 0 ? (
        <p
          style={{
            fontSize: 14,
            color: 'var(--dark-gray-3)',
            textAlign: 'center',
            padding: '20px 0',
          }}
        >
          Seu carrinho está vazio.
        </p>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              maxHeight: 240,
              overflowY: 'auto',
              paddingBottom: 16,
              borderBottom: '1px solid var(--light-gray-2)',
              marginBottom: 16,
            }}
          >
            {items.map((item, idx) => {
              const unitPrice = item.priceDiscount ?? item.price;

              return (
                <div
                  key={`${item.id}-${idx}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 54,
                      borderRadius: 4,
                      background: '#E2E3FF',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'var(--dark-gray)',
                        marginBottom: 4,
                        lineHeight: 1.3,
                      }}
                    >
                      {item.name}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 13,
                      }}
                    >
                      <strong style={{ color: 'var(--dark-gray)' }}>
                        {formatBRL(unitPrice)}
                      </strong>
                      {item.priceDiscount && (
                        <span
                          style={{
                            color: 'var(--light-gray-2)',
                            textDecoration: 'line-through',
                            fontSize: 12,
                          }}
                        >
                          {formatBRL(item.price)}
                        </span>
                      )}
                      {item.quantity > 1 && (
                        <span
                          style={{
                            color: 'var(--dark-gray-3)',
                            fontSize: 12,
                          }}
                        >
                          x{item.quantity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 18,
            }}
          >
            <strong style={{ fontSize: 15, color: 'var(--dark-gray)' }}>
              Valor total:
            </strong>
            <strong style={{ fontSize: 16, color: 'var(--error)' }}>
              {formatBRL(subtotal)}
            </strong>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <button
              type="button"
              onClick={clearCart}
              style={{
                background: 'transparent',
                color: 'var(--dark-gray-2)',
                fontSize: 13,
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              Esvaziar
            </button>

            <Link
              to="/carrinho"
              className="login-btn"
              onClick={onClose}
              style={{ width: 130 }}
            >
              Ver Carrinho
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;