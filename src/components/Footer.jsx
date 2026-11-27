import React from 'react';
import Logo from './Logo';
import FooterInfo from './FooterInfo';
import facebookIcon from '../assets/facebook.svg';
import instagramIcon from '../assets/instagram.svg';
import twitterIcon from '../assets/twitter.svg';

const infoLinks = [
  { text: 'Sobre Drip Store', link: '/about' },
  { text: 'Segurança', link: '/security' },
  { text: 'Wishlist', link: '/wishlist' },
  { text: 'Blog', link: '/blog' },
  { text: 'Trabalhe conosco', link: '/careers' },
  { text: 'Meus Pedidos', link: '/meus-pedidos' },
];

const categoryLinks = [
  { text: 'Camisetas', link: '/produtos?filter=camiseta' },
  { text: 'Calças', link: '/produtos?filter=calca' },
  { text: 'Bonés', link: '/produtos?filter=bone' },
  { text: 'Headphones', link: '/produtos?filter=headphone' },
  { text: 'Tênis', link: '/produtos?filter=tenis' },
];

const contactLinks = [
  {
    text: 'Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161',
    link: '#',
  },
  { text: '(85) 3051-3411', link: 'tel:8530513411' },
];

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <Logo variant="white" />
          <p className="footer-desc">
            Sua loja online de calçados, moda urbana e acessórios esportivos com
            curadoria exclusiva e entrega para todo o Brasil.
          </p>
          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <img src={facebookIcon} alt="Facebook" width={20} height={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <img src={instagramIcon} alt="Instagram" width={20} height={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <img src={twitterIcon} alt="Twitter" width={20} height={20} />
            </a>
          </div>
        </div>
        <FooterInfo title="Informação" informations={infoLinks} />
        <FooterInfo title="Categorias" informations={categoryLinks} />
        <FooterInfo title="Contato" informations={contactLinks} />
      </div>

      <hr className="footer-divider" />
      <p className="footer-copy">© {new Date().getFullYear()} Digital Store</p>
    </div>
  </footer>
);

export default Footer;