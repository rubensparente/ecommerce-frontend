import React from 'react';
import { Link } from 'react-router-dom';

const Section = ({ title, titleAlign = 'left', link, children }) => (
  <section className="page-section">
    <div className={`section-header ${titleAlign}`}>
      <h2 className="section-title">{title}</h2>
      {link && titleAlign !== 'center' && (
        <Link to={link.href} className="section-link">
          {link.text} &rarr;
        </Link>
      )}
    </div>
    {children}
  </section>
);

export default Section;
