// components/Stage.tsx
import React from 'react';

const Stage: React.FC = () => {
  return (
    <div className="mb-4"> {/* Quitamos text-center */}
      
      {/* Escenario principal - alineado a la izquierda */}
      <div
        style={{
          background: 'linear-gradient(180deg, #064e3b 0%, #047857 60%, #065f46 100%)',
          border: '3px solid #10b981',
          borderBottom: 'none',
          borderRadius: '12px 12px 0 0',
          padding: '18px 40px 14px',
          display: 'inline-block',           // importante para que no ocupe todo el ancho
          minWidth: '60%',
          maxWidth: '700px',
          boxShadow: '0 -4px 30px rgba(16,185,129,0.25), inset 0 2px 8px rgba(167,243,208,0.1)',
          position: 'relative',
          marginLeft: '2%',                  // forzado a la izquierda
          marginRight: 'auto',
        }}
      >
        {/* Luces del escenario */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '8px' }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#f97316',
                boxShadow: '0 0 8px 3px rgba(249,115,22,0.6)',
                animation: `pulse ${1.2 + i * 0.15}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* Nombre del escenario */}
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#a7f3d0',
            letterSpacing: '0.2em',
            margin: 0,
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(16,185,129,0.5)',
          }}
        >
          🎬 UNA-ESCENARIO
        </p>
      </div>

      {/* Borde inferior del escenario */}
      <div
        style={{
          height: '10px',
          background: 'linear-gradient(180deg, #10b981 0%, #047857 100%)',
          minWidth: '60%',
          maxWidth: '700px',
          marginLeft: '2%',      // ← alineado a la izquierda
          marginRight: 'auto',
          borderRadius: '0 0 4px 4px',
          boxShadow: '0 6px 20px rgba(16,185,129,0.3)',
        }}
      />

      {/* Etiqueta indicativa */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.72rem',
          color: '#888',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: '10px',
          marginLeft: '8px',     // pequeño margen para que no quede pegado del todo
        }}
      >
        ▲ Frente al escenario ▲
      </p>
    </div>
  );
};

export default Stage;