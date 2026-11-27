import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { useAuth } from '../contexts/AuthContext';

const formatEmail = (value) => value.replace(/\s/g, '').toLowerCase();

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, socialLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(email, password);
    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <Layout>
      <section className="auth-hero">
        <div className="container auth-grid">
          <div className="auth-card">
            <h1>Acesse sua conta</h1>
            <p className="auth-subtitle">
              Novo cliente? Então registre-se{' '}
              <Link
                to="/register"
                className="auth-inline-link auth-inline-link--pink"
              >
                aqui
              </Link>
              .
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="login-email">E-mail *</label>
                <input
                  id="login-email"
                  type="email"
                  inputMode="email"
                  placeholder="Insira seu e-mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(formatEmail(e.target.value));
                    setError('');
                  }}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="login-password">Senha *</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Insira sua senha"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  required
                />
              </div>

              {error && <p className="auth-error">{error}</p>}

              <div className="auth-forgot">
                <Link to="/recuperar-senha" className="auth-inline-link">
                  Esqueci minha senha
                </Link>
              </div>

              <button type="submit" className="primary-btn">
                Acessar Conta
              </button>
            </form>

            <div className="auth-social">
              <span>Ou faça login com</span>
              <div className="auth-social-icons">
                <button
                  type="button"
                  className="social-login-btn"
                  aria-label="Login com Gmail"
                  onClick={() => {
                    socialLogin('usuario@gmail.com', 'Usuário Gmail');
                    navigate(from, { replace: true });
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="social-login-btn"
                  aria-label="Login com Facebook"
                  onClick={() => {
                    socialLogin('usuario@facebook.com', 'Usuário Facebook');
                    navigate(from, { replace: true });
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path
                      fill="#1877F2"
                      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="auth-visual">
            <img src="/produc-image-1.jpeg" alt="Tênis Digital Store" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;