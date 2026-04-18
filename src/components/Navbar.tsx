// ============================================================
// components/Navbar.tsx
// Barra de navegación principal del teatro
// ============================================================

import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#0f0f0f', borderBottom: '1px solid #10b981' }}>
      <div className="container-fluid px-4">

        {/* Logo / Nombre */}
        <a className="navbar-brand d-flex align-items-center gap-2" href="#" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '1.6rem' }}>🎭</span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: '1.4rem',
            color: '#10b981',
            letterSpacing: '0.05em',
          }}>
            TEATRO-UNA
          </span>
        </a>

        {/* Toggle para mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: '#10b981' }}
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        {/* Links de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2">
            {['Inicio', 'Programación', 'Nosotros', 'Contacto'].map((item) => (
              <li className="nav-item" key={item}>
                <a
                  className="nav-link"
                  href="#"
                  style={{
                    color: '#e0e0e0',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#e0e0e0')}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
