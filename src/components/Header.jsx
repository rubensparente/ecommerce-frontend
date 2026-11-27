import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import CartModal from './CartModal';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import cartIcon from '../assets/mini-cart.svg';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const cleaned = searchTerm
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (cleaned) {
      navigate(`/produtos?filter=${encodeURIComponent(cleaned)}`);
    } else {
      navigate('/produtos');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-top">
          <Link to="/" aria-label="Digital Store Home">
            <Logo />
          </Link>

          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Pesquisar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" aria-label="Pesquisar">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>

          <div className="header-actions">
            {isAuthenticated ? (
              <>
                <span className="user-greeting">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>
                    Olá, <strong>{user.name}</strong>
                  </span>
                </span>

                <button
                  type="button"
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="register-link">
                  Cadastre-se
                </Link>
                <Link to="/login" className="login-btn">
                  Entrar
                </Link>
              </>
            )}

            <button
              type="button"
              className="cart-btn"
              aria-label="Abrir carrinho"
              onClick={() => setCartOpen((prev) => !prev)}
            >
              <img src={cartIcon} alt="Carrinho" width={24} height={24} />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button>

            {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}
          </div>
        </div>

        <nav className="header-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/produtos"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Produtos
          </NavLink>
          <NavLink
            to="/categorias"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Categorias
          </NavLink>
          <NavLink
            to="/meus-pedidos"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Meus Pedidos
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;