// ============================================================
// components/Footer.tsx
// Pie de página con información del TEATRO-UNA
// ============================================================

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid #c9a84c',
        padding: '36px 24px 20px',
        marginTop: '60px',
      }}
    >
      <div className="container">
        <div className="row g-4">

          {/* Columna 1: Nombre e identidad */}
          <div className="col-md-4">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '2rem' }}>🎭</span>
              <div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    color: '#c9a84c',
                    margin: 0,
                    letterSpacing: '0.05em',
                  }}
                >
                  TEATRO-UNA
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.75rem',
                    color: '#666',
                    margin: 0,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Universidad Nacional de Costa Rica
                </p>
              </div>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.82rem',
                color: '#888',
                lineHeight: 1.6,
              }}
            >
              El teatro principal de la Universidad Nacional, espacio dedicado
              al arte, la cultura y la expresión escénica costarricense.
            </p>
          </div>

          {/* Columna 2: Información de contacto */}
          <div className="col-md-4">
            <h6
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#c9a84c',
                fontSize: '0.95rem',
                letterSpacing: '0.08em',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              Contacto
            </h6>
            {[
              { icon: '📍', label: 'Dirección', value: 'Campus Omar Dengo, Heredia, Costa Rica' },
              { icon: '📞', label: 'Teléfono', value: '+506 2562-6000' },
              { icon: '✉️', label: 'Correo',    value: 'teatro@una.ac.cr' },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}
              >
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.72rem',
                      color: '#555',
                      display: 'block',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.85rem',
                      color: '#bbb',
                    }}
                  >
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Columna 3: Horarios */}
          <div className="col-md-4">
            <h6
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#c9a84c',
                fontSize: '0.95rem',
                letterSpacing: '0.08em',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              Horarios de taquilla
            </h6>
            {[
              { day: 'Lunes – Viernes',  time: '9:00 am – 6:00 pm' },
              { day: 'Sábados',          time: '10:00 am – 4:00 pm' },
              { day: 'Domingos',         time: 'Cerrado' },
            ].map(({ day, time }) => (
              <div
                key={day}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #1f1f1f',
                  paddingBottom: '6px',
                  marginBottom: '6px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.82rem',
                    color: '#888',
                  }}
                >
                  {day}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.82rem',
                    color: time === 'Cerrado' ? '#c04040' : '#bbb',
                    fontWeight: 500,
                  }}
                >
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Línea inferior */}
        <div
          style={{
            borderTop: '1px solid #1f1f1f',
            marginTop: '28px',
            paddingTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.75rem',
              color: '#444',
              margin: 0,
            }}
          >
            © 2026 TEATRO-UNA — Universidad Nacional de Costa Rica. Todos los derechos reservados.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.75rem',
              color: '#333',
              margin: 0,
            }}
          >
            Fundamentos de Programación Web — I Ciclo 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
