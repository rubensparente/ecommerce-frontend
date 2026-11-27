import React from 'react';
import { Link } from 'react-router-dom';

const FooterInfo = ({ title, informations = [] }) => (
  <div className="footer-info">
    <h4>{title}</h4>
    <ul>
      {informations.map((item, idx) => (
        <li key={idx}>
          <Link to={item.link}>{item.text}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterInfo;