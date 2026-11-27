import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { useAuth } from '../contexts/AuthContext';

const formatEmail = (value) => value.replace(/\s/g, '').toLowerCase();
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'email' ? formatEmail(value) : value;
    setForm({ ...form, [name]: formattedValue });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      setError('Insira um e-mail válido (ex: nome@dominio.com).');
      return;
    }

    if (form.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    const result = register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate('/');
  };

  return (
    <Layout>
      <section className="auth-hero">
        <div className="container auth-grid">
          <div className="auth-card">
            <h1>Crie sua conta</h1>
            <p className="auth-subtitle">
              Já possui uma conta? Entre{' '}
              <Link
                to="/login"
                className="auth-inline-link auth-inline-link--pink"
              >
                aqui
              </Link>
              .
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-row-2">
                <div className="form-field">
                  <label htmlFor="firstName">Nome *</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Insira seu nome"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="lastName">Sobrenome *</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Insira seu sobrenome"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="register-email">E-mail *</label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="exemplo@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="register-password">Senha *</label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="Mínimo de 6 caracteres"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="confirmPassword">Confirme a senha *</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Repita a senha"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
              </div>

              {error && <p className="auth-error">{error}</p>}

              <button type="submit" className="primary-btn" style={{ marginTop: 8 }}>
                Criar Conta
              </button>
            </form>
          </div>

          <div className="auth-visual">
            <img src="/produc-image-1.jpeg" alt="Tênis Digital Store" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;