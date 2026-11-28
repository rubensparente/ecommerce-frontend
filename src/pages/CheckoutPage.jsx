import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const formatCPF = (value) =>
  value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

const formatPhone = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return digits
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
};

const formatCEP = (value) =>
  value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d{1,3})$/, '$1-$2');

const formatCardNumber = (value) =>
  value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ');

const formatCardExpiry = (value) =>
  value
    .replace(/\D/g, '')
    .slice(0, 4)
    .replace(/(\d{2})(\d)/, '$1/$2');

const formatCVV = (value) => value.replace(/\D/g, '').slice(0, 4);

const CheckoutPage = () => {
  const { items, subtotal, addOrder, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [form, setForm] = useState({
    name: user?.name || '',
    cpf: '',
    email: user?.email || '',
    phone: '',
    address: '',
    neighborhood: '',
    city: '',
    cep: '',
    complement: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const shipping = 0;
  const discount = 0;
  const total = Math.max(0, subtotal + shipping - discount);
  const installment = (total / 10).toFixed(2).replace('.', ',');

  const formatBRL = (value) =>
    `R$ ${Number(value || 0).toFixed(2).replace('.', ',')}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') formattedValue = formatCPF(value);
    if (name === 'phone') formattedValue = formatPhone(value);
    if (name === 'cep') formattedValue = formatCEP(value);
    if (name === 'cardNumber') formattedValue = formatCardNumber(value);
    if (name === 'cardExpiry') formattedValue = formatCardExpiry(value);
    if (name === 'cardCvv') formattedValue = formatCVV(value);
    if (name === 'email') formattedValue = value.replace(/\s/g, '').toLowerCase();

    setForm((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addOrder({
      ...form,
      paymentMethod,
      items,
      subtotal,
      shipping,
      discount,
      total,
    });

    clearCart();
    navigate('/order-success');
  };

  return (
    <Layout>
      <div className="container checkout-page">
        <h1 className="checkout-title">Finalizar Compra</h1>

        <form className="checkout-grid" onSubmit={handleSubmit}>
          {/* Coluna Esquerda — Formulários */}
          <div>
            {/* Informações Pessoais */}
            <div className="card-box">
              <h2 className="checkout-card-title">Informações Pessoais</h2>

              <div className="form-field">
                <label htmlFor="name">Nome Completo *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Insira seu nome"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="cpf">CPF *</label>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  inputMode="numeric"
                  maxLength={14}
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">E-mail *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  placeholder="Insira seu email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">Celular *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={15}
                  placeholder="(00) 00000-0000"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Informações de Entrega */}
            <div className="card-box">
              <h2 className="checkout-card-title">Informações de Entrega</h2>

              <div className="form-field">
                <label htmlFor="address">Endereço *</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Insira seu endereço"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="neighborhood">Bairro *</label>
                <input
                  id="neighborhood"
                  name="neighborhood"
                  type="text"
                  placeholder="Insira seu bairro"
                  value={form.neighborhood}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="city">Cidade *</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Insira sua cidade"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="cep">CEP *</label>
                <input
                  id="cep"
                  name="cep"
                  type="text"
                  inputMode="numeric"
                  maxLength={9}
                  placeholder="00000-000"
                  value={form.cep}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="complement">Complemento</label>
                <input
                  id="complement"
                  name="complement"
                  type="text"
                  placeholder="Insira complemento"
                  value={form.complement}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Informações de Pagamento */}
            <div className="card-box">
              <h2 className="checkout-card-title">Informações de Pagamento</h2>

              <div className="form-field">
                <label>Forma de Pagamento</label>
                <div className="payment-methods">
                  <label className="payment-radio">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={paymentMethod === 'credit'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Cartão de Crédito
                  </label>

                  <label className="payment-radio">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="boleto"
                      checked={paymentMethod === 'boleto'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Boleto Bancário
                  </label>
                </div>
              </div>

              {paymentMethod === 'credit' && (
                <>
                  <div className="form-field">
                    <label htmlFor="cardName">Nome do Cartão *</label>
                    <input
                      id="cardName"
                      name="cardName"
                      type="text"
                      placeholder="Insira o nome do Cartão"
                      value={form.cardName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-field">
                      <label htmlFor="cardNumber">Número do Cartão *</label>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        inputMode="numeric"
                        maxLength={19}
                        placeholder="0000 0000 0000 0000"
                        value={form.cardNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="cardExpiry">Data de validade do Cartão *</label>
                      <input
                        id="cardExpiry"
                        name="cardExpiry"
                        type="text"
                        inputMode="numeric"
                        maxLength={5}
                        placeholder="MM/AA"
                        value={form.cardExpiry}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="cardCvv">CVV *</label>
                    <input
                      id="cardCvv"
                      name="cardCvv"
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="CVV"
                      value={form.cardCvv}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
            </div>

            {/* Finalizar Compra (Rodapé do formulário) */}
            <div className="card-box">
              <h2 className="checkout-card-title">Finalizar Compra</h2>

              <div className="checkout-bottom-total">
                <strong>Total</strong>
                <div className="checkout-total-right">
                  <strong className="checkout-total-pink">
                    {formatBRL(total)}
                  </strong>
                  <span>ou 10x de R$ {installment} sem juros</span>
                </div>
              </div>

              <button
                type="submit"
                className="warning-btn"
                disabled={items.length === 0}
              >
                Realizar Pagamento
              </button>
            </div>
          </div>

          {/* Coluna Direita — Resumo */}
          <aside className="card-box">
            <h2 className="checkout-card-title">RESUMO</h2>

            <div className="summary-items">
              {items.map((item, idx) => (
                <div className="summary-item" key={`${item.id}-${idx}`}>
                  <div className="summary-item-thumb">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <span className="summary-item-name">
                    {item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}
                  </span>
                </div>
              ))}
            </div>

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
                <strong>{formatBRL(total)}</strong>
              </div>
              <p className="summary-installments">
                ou 10x de R$ {installment} sem juros
              </p>
            </div>

            <button
              type="submit"
              className="warning-btn"
              disabled={items.length === 0}
            >
              Realizar Pagamento
            </button>
          </aside>
        </form>
      </div>
    </Layout>
  );
};

export default CheckoutPage;