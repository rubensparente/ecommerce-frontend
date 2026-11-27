import React from 'react';
import logoHeader from '../assets/logo-header.svg';
import logoFooter from '../assets/logo-footer.svg';

const Logo = ({ variant = 'primary' }) => (
  <img
    src={variant === 'white' ? logoFooter : logoHeader}
    alt="Digital Store"
    width={253}
    height={44}
    style={{ display: 'block', objectFit: 'contain' }}
  />
);

export default Logo;
