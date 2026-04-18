import React, { useState, useEffect } from 'react';

interface CurtainIntroProps {
  onOpen: () => void;
}

const CurtainIntro: React.FC<CurtainIntroProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!isOpening) return;

    // Oculta el telón después de 1200ms para mostrar la página completa
    const hideTimer = setTimeout(() => {
      setIsHidden(true);
      onOpen();
    }, 1200);

    return () => {
      clearTimeout(hideTimer);
    };
  }, [isOpening, onOpen]);

  if (isHidden) {
    return null;
  }

  const handleOpenCurtain = () => {
    setIsOpening(true);
  };

  return (
    <div
      onClick={handleOpenCurtain}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 9999,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Cortina izquierda */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, #2d1f1f 0%, #6b1a1a 50%, #8B2323 100%)',
          boxShadow: 'inset -20px 0 40px rgba(0, 0, 0, 0.8)',
          animation: isOpening ? 'curtainSlideLeft 1.2s cubic-bezier(0.8, 0.05, 0.2, 1) forwards' : 'none',
          zIndex: 2,
        }}
      />

      {/* Cortina derecha */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(270deg, #2d1f1f 0%, #6b1a1a 50%, #8B2323 100%)',
          boxShadow: 'inset 20px 0 40px rgba(0, 0, 0, 0.8)',
          animation: isOpening ? 'curtainSlideRight 1.2s cubic-bezier(0.8, 0.05, 0.2, 1) forwards' : 'none',
          zIndex: 2,
        }}
      />

      {/* Contenido - Título y botón */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 10,
          pointerEvents: 'none',
          animation: isOpening ? 'fadeOut 1.2s cubic-bezier(0.8, 0.05, 0.2, 1) forwards' : 'none',
          maxWidth: '600px',
          width: '90%',
          padding: '20px',
        }}
      >
        {/* Logo/escudo superior */}
        <div
          style={{
            fontSize: '4rem',
            marginBottom: '30px',
            animation: 'fadeInScale 1s ease-out 0.2s both',
          }}
        >
          🎭
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 900,
            color: '#f0f0f0',
            letterSpacing: '0.08em',
            marginBottom: '12px',
            marginTop: 0,
            textShadow: '0 6px 30px rgba(0, 0, 0, 0.9), 0 0 60px rgba(16, 185, 129, 0.2)',
            animation: 'fadeInScale 1s ease-out 0.3s both',
            lineHeight: 1.1,
          }}
        >
          TEATRO-UNA
        </h1>

        {/* Separador elegante */}
        <div
          style={{
            width: '80px',
            height: '2px',
            backgroundColor: '#10b981',
            margin: '20px auto 30px',
            animation: 'slideInWidth 0.8s ease-out 0.5s both',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
          }}
        />

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: '#10b981',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
            marginBottom: '50px',
            marginTop: 0,
            fontWeight: 500,
            animation: 'fadeInScale 1s ease-out 0.4s both',
          }}
        >
          Sistema de Reserva de Asientos
        </p>

        {/* Hint central */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            color: '#10b981',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginTop: '0',
            marginBottom: 0,
            fontWeight: 500,
            animation: 'glow 1.5s ease-in-out 0.8s infinite',
          }}
        >
          Haz click para abrir el telón
        </p>
      </div>
    </div>
  );
};

export default CurtainIntro;
