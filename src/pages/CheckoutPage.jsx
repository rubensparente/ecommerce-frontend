import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { useCart } from '../contexts/CartContext';

const formatCPF = (value) =>
  value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

const formatPhone = (value) =>
  value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');

const formatCEP = (value) =>
  value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d{1,3})$/, '$1-$2');

const formatEmail = (value) => value.replace(/\s/g, '').toLowerCase();

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

const formatCvv = (value) => value.replace(/\D/g, '').slice(0, 4);

const fieldFormatters = {
  cpf: formatCPF,
  phone: formatPhone,
  cep: formatCEP,
  email: formatEmail,
  cardNumber: formatCardNumber,
  cardExpiry: formatCardExpiry,
  cardCvv: formatCvv,
};

const CheckoutPage = () => {
  const { items, subtotal, setLastOrder, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    email: '',
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

  const discount = subtotal > 0 ? 30.0 : 0;
  const total = Math.max(0, subtotal - discount);
  const installment = (total / 10).toFixed(2).replace('.', ',');

  const formatBRL = (value) =>
    `R$ ${value.toFixed(2).replace('.', ',')}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = fieldFormatters[name]
      ? fieldFormatters[name](value)
      : value;
    setForm({ ...form, [name]: formattedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLastOrder({
      ...form,
      paymentMethod,
      items,
      subtotal,
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

        <form onSubmit={handleSubmit} className="checkout-grid">
          {/* Coluna Esquerda */}
          <div>
            {/* 1. Informações Pessoais */}
            <div className="card-box">
              <h3 className="checkout-card-title">Informações Pessoais</h3>

              <div className="form-field">
                <label>Nome Completo *</label>
                <input
                  name="name"
                  placeholder="Insira seu nome"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>CPF *</label>
                <input
                  name="cpf"
                  inputMode="numeric"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                  title="Digite um CPF válido no formato 000.000.000-00"
                  value={form.cpf}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>E-mail *</label>
                <input
                  name="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Celular *</label>
                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  pattern="\(\d{2}\)\s\d{5}-\d{4}"
                  title="Digite um celular válido no formato (00) 00000-0000"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* 2. Informações de Entrega */}
            <div className="card-box">
              <h3 className="checkout-card-title">Informações de Entrega</h3>

              <div className="form-field">
                <label>Endereço *</label>
                <input
                  name="address"
                  placeholder="Insira seu endereço"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Bairro *</label>
                <input
                  name="neighborhood"
                  placeholder="Insira seu bairro"
                  value={form.neighborhood}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Cidade *</label>
                <input
                  name="city"
                  placeholder="Insira sua cidade"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>CEP *</label>
                <input
                  name="cep"
                  inputMode="numeric"
                  placeholder="00000-000"
                  maxLength={9}
                  pattern="\d{5}-\d{3}"
                  title="Digite um CEP válido no formato 00000-000"
                  value={form.cep}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Complemento</label>
                <input
                  name="complement"
                  placeholder="Insira complemento"
                  value={form.complement}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 3. Informações de Pagamento */}
            <div className="card-box">
              <h3 className="checkout-card-title">Informações de Pagamento</h3>

              <div className="form-field">
                <label>Forma de Pagamento</label>
                <div className="payment-methods">
                  <label className="payment-radio">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={paymentMethod === 'credit'}
                      onChange={() => setPaymentMethod('credit')}
                    />
                    <span>Cartão de Crédito</span>
                  </label>

                  <label className="payment-radio">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="boleto"
                      checked={paymentMethod === 'boleto'}
                      onChange={() => setPaymentMethod('boleto')}
                    />
                    <span>Boleto Bancário</span>
                  </label>
                </div>
              </div>

              {paymentMethod === 'credit' && (
                <>
                  <div className="form-field">
                    <label>Nome do Cartão *</label>
                    <input
                      name="cardName"
                      placeholder="Insira o nome do Cartão"
                      value={form.cardName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-field">
                      <label>Número do Cartão *</label>
                      <input
                        name="cardNumber"
                        inputMode="numeric"
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        value={form.cardNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label>Data de validade do Cartão *</label>
                      <input
                        name="cardExpiry"
                        inputMode="numeric"
                        placeholder="MM/AA"
                        maxLength={5}
                        pattern="\d{2}/\d{2}"
                        title="Digite a validade no formato MM/AA"
                        value={form.cardExpiry}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-field">
                      <label>CVV *</label>
                      <input
                        name="cardCvv"
                        inputMode="numeric"
                        placeholder="000"
                        maxLength={4}
                        value={form.cardCvv}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* 4. Card Finalizar Compra (rodapé da coluna esquerda) */}
            <div className="card-box">
              <h3 className="checkout-card-title">Finalizar Compra</h3>

              <div className="checkout-bottom-total">
                <strong>Total</strong>
                <div className="checkout-total-right">
                  <strong className="checkout-total-pink">
                    {formatBRL(total)}
                  </strong>
                  <span>ou 10x de R$ {installment} sem juros</span>
                </div>
              </div>

              <button type="submit" className="warning-btn">
                Realizar Pagamento
              </button>
            </div>
          </div>

          {/* Coluna Direita — RESUMO */}
          <aside className="card-box checkout-summary">
            <h3 className="checkout-card-title">RESUMO</h3>

            <div className="summary-items">
              {items.length === 0 ? (
                <p style={{ fontSize: 14, color: 'var(--light-gray)' }}>
                  Nenhum produto no carrinho.
                </p>
              ) : (
                items.map((item, idx) => (
                  <div className="summary-item" key={idx}>
                    <div className="summary-item-thumb">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <span className="summary-item-name">{item.name}</span>
                  </div>
                ))
              )}
            </div>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal:</span>
                <strong>{formatBRL(subtotal)}</strong>
              </div>
              <div className="summary-row">
                <span>Frete:</span>
                <strong>R$ 0,00</strong>
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

            <button type="submit" className="warning-btn">
              Realizar Pagamento
            </button>
          </aside>
        </form>
      </div>
    </Layout>
  );
};

export default CheckoutPage;