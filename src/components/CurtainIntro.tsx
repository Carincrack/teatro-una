import React, { useState, useEffect } from 'react';

interface CurtainIntroProps {
  onOpen: () => void;
}

const CurtainIntro: React.FC<CurtainIntroProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isOpening) return;
    const hideTimer = setTimeout(() => {
      setIsHidden(true);
      onOpen();
    }, 1800);
    return () => clearTimeout(hideTimer);
  }, [isOpening, onOpen]);

  if (isHidden) return null;

  const keyframes = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=IM+Fell+English+SC&family=Cinzel:wght@400;600;700&display=swap');

    @keyframes curtainLeft {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-105%); }
    }
    @keyframes curtainRight {
      0%   { transform: translateX(0); }
      100% { transform: translateX(105%); }
    }
    @keyframes pelmetUp {
      0%   { transform: translateY(0); }
      100% { transform: translateY(-120%); }
    }
    @keyframes fadeOut {
      0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      40%  { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scaleX(0); }
      to   { opacity: 1; transform: scaleX(1); }
    }
    @keyframes shimmer {
      0%   { opacity: 0.55; }
      50%  { opacity: 1; }
      100% { opacity: 0.55; }
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0px 0 rgba(212,168,67,0); }
      50%       { box-shadow: 0 0 18px 3px rgba(212,168,67,0.35); }
    }
    @keyframes tassel {
      0%, 100% { transform: rotate(-2deg); }
      50%       { transform: rotate(2deg); }
    }
    @keyframes spotlight {
      0%, 100% { opacity: 0.07; }
      50%       { opacity: 0.13; }
    }
    @keyframes borderGlow {
      0%, 100% { opacity: 0.5; }
      50%       { opacity: 1; }
    }
    .tassel { animation: tassel 3s ease-in-out infinite; transform-origin: top center; }
    .tassel:nth-child(2n) { animation-delay: 0.5s; }
    .tassel:nth-child(3n) { animation-delay: 1.1s; }
    .tassel:nth-child(5n) { animation-delay: 1.8s; }
  `;

  const GOLD = '#c9912e';
  const GOLD_LIGHT = '#f0c96a';
  const IVORY = '#f5ead0';

  /* ── Pelmet scallop shape via SVG ── */
  const PelmetSVG = () => (
    <svg
      viewBox="0 0 800 90"
      preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height: '90px' }}
    >
      <defs>
        <linearGradient id="pelG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7a1010" />
          <stop offset="55%"  stopColor="#9e1c1c" />
          <stop offset="100%" stopColor="#5c0c0c" />
        </linearGradient>
        <linearGradient id="barG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#5c3d0a" />
          <stop offset="20%"  stopColor="#c9912e" />
          <stop offset="50%"  stopColor="#f0c96a" />
          <stop offset="80%"  stopColor="#c9912e" />
          <stop offset="100%" stopColor="#5c3d0a" />
        </linearGradient>
        <linearGradient id="trimG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#7a5c1e" />
          <stop offset="25%"  stopColor="#d4a843" />
          <stop offset="50%"  stopColor="#f5d070" />
          <stop offset="75%"  stopColor="#c9912e" />
          <stop offset="100%" stopColor="#7a5c1e" />
        </linearGradient>
      </defs>
      {/* Top gold rail */}
      <rect x="0" y="0" width="800" height="10" fill="url(#barG)" />
      <rect x="0" y="9"  width="800" height="1.5" fill="#f5d070" opacity="0.5" />

      {/* Velvet body */}
      <rect x="0" y="10" width="800" height="50" fill="url(#pelG)" />

      {/* Fabric fold lines */}
      {[60,120,180,240,300,360,420,480,540,600,660,720,780].map((x, i) => (
        <line key={i} x1={x} y1="10" x2={x} y2="60" stroke="#000" strokeWidth="1.2" strokeOpacity="0.18" />
      ))}
      {/* Highlight sheen */}
      {[30,90,150,210,270,330,390,450,510,570,630,690,750].map((x, i) => (
        <line key={i} x1={x} y1="10" x2={x} y2="60" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.06" />
      ))}

      {/* Scallop wave */}
      <path
        d="M0,60 Q20,85 40,62 Q60,40 80,62 Q100,85 120,62 Q140,40 160,62 Q180,85 200,62 Q220,40 240,62 Q260,85 280,62 Q300,40 320,62 Q340,85 360,62 Q380,40 400,62 Q420,85 440,62 Q460,40 480,62 Q500,85 520,62 Q540,40 560,62 Q580,85 600,62 Q620,40 640,62 Q660,85 680,62 Q700,40 720,62 Q740,85 760,62 Q780,40 800,62 L800,10 L0,10 Z"
        fill="url(#pelG)"
      />

      {/* Gold trim on scallop */}
      <path
        d="M0,60 Q20,85 40,62 Q60,40 80,62 Q100,85 120,62 Q140,40 160,62 Q180,85 200,62 Q220,40 240,62 Q260,85 280,62 Q300,40 320,62 Q340,85 360,62 Q380,40 400,62 Q420,85 440,62 Q460,40 480,62 Q500,85 520,62 Q540,40 560,62 Q580,85 600,62 Q620,40 640,62 Q660,85 680,62 Q700,40 720,62 Q740,85 760,62 Q780,40 800,62"
        fill="none"
        stroke="url(#trimG)"
        strokeWidth="2.5"
      />
    </svg>
  );

  /* ── Single tassel element ── */
  const Tassel = ({ x }: { x: string }) => (
    <div
      className="tassel"
      style={{
        position: 'absolute',
        left: x,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transformOrigin: 'top center',
      }}
    >
      {/* Knot cap */}
      <div style={{
        width: 10, height: 12,
        borderRadius: '50% 50% 40% 40%',
        background: 'linear-gradient(180deg, #f0c96a 0%, #c9912e 60%, #7a5c1e 100%)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
      }} />
      {/* Threads */}
      <div style={{ display: 'flex', gap: 1.5, marginTop: 1 }}>
        {[-2, 0, 2].map((offset, i) => (
          <div key={i} style={{
            width: 1.5, height: 32,
            background: `linear-gradient(180deg, ${i === 1 ? '#f0c96a' : '#c9912e'} 0%, #7a5c1e 100%)`,
            borderRadius: 1,
            marginBottom: offset,
            transform: `rotate(${offset * 1.5}deg)`,
          }} />
        ))}
      </div>
      {/* Bulb */}
      <div style={{
        width: 12, height: 14,
        borderRadius: '40% 40% 60% 60%',
        background: 'linear-gradient(180deg, #c9912e 0%, #7a5c1e 100%)',
        boxShadow: '0 3px 8px rgba(0,0,0,0.5)',
        marginTop: -2,
      }} />
    </div>
  );

  /* ── Stage light fixture ── */
  const StageLight = ({ x }: { x: number }) => (
    <div style={{
      position: 'absolute',
      left: x,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Housing */}
      <div style={{
        width: 26, height: 14,
        background: 'linear-gradient(180deg, #222 0%, #3a3a3a 100%)',
        borderRadius: '4px 4px 2px 2px',
        border: `1px solid ${GOLD}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.7)',
      }}>
        {/* Lens */}
        <div style={{
          width: 14, height: 8,
          borderRadius: 20,
          background: 'radial-gradient(circle at 40% 35%, #fff8e0 0%, #f0c050 40%, #c97c10 100%)',
          boxShadow: '0 0 10px 3px rgba(240,200,80,0.5)',
          animation: 'shimmer 3s ease-in-out infinite',
        }} />
      </div>
      {/* Cone of light suggestion */}
      <div style={{
        width: 0,
        height: 0,
        borderLeft: '20px solid transparent',
        borderRight: '20px solid transparent',
        borderTop: `6px solid ${GOLD}22`,
        marginTop: 0,
      }} />
    </div>
  );

  /* ── Ornate corner ornament (SVG) ── */
  const CornerOrnament = ({ flip }: { flip?: boolean }) => (
    <svg viewBox="0 0 60 60" width={60} height={60}
      style={{ transform: flip ? 'scaleX(-1)' : undefined, opacity: 0.7 }}>
      <g fill="none" stroke={GOLD} strokeWidth="1.2">
        <path d="M5,55 L5,10 Q5,5 10,5 L55,5" strokeLinecap="round" />
        <path d="M5,40 Q20,40 20,55" />
        <path d="M5,25 Q35,25 35,55" />
        <circle cx="5" cy="5" r="4" fill={GOLD} />
        <circle cx="5" cy="5" r="2" fill="#1a0a0a" />
      </g>
    </svg>
  );

  return (
    <>
      <style>{keyframes}</style>
      <div
        onClick={() => !isOpening && setIsOpening(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          cursor: isOpening ? 'default' : 'pointer',
          overflow: 'hidden',
          backgroundColor: isOpening ? 'transparent' : '#04010a',
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        {/* ══ STAGE FLOOR ══ */}
        {!isOpening && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
            background: 'linear-gradient(180deg, #140b02 0%, #0a0501 100%)',
            borderTop: `2px solid ${GOLD}55`,
            boxShadow: `0 -8px 40px rgba(0,0,0,0.8), inset 0 2px 20px rgba(201,145,46,0.08)`,
            zIndex: 1,
          }} />
        )}

        {/* ══ SPOTLIGHT CONE ══ */}
        {!isOpening && (
          <div style={{
            position: 'absolute', top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: '70%', height: '100%',
            background: 'radial-gradient(ellipse 55% 80% at 50% 0%, rgba(255,240,180,0.1) 0%, transparent 70%)',
            animation: 'spotlight 4s ease-in-out infinite',
            zIndex: 1, pointerEvents: 'none',
          }} />
        )}

        {/* ══ LEFT CURTAIN ══ */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '50%', height: '100%',
          animation: isOpening ? 'curtainLeft 1.8s cubic-bezier(0.76,0,0.24,1) forwards' : 'none',
          zIndex: 3,
        }}>
          <div style={{
            width: '100%', height: '100%',
            background: `
              repeating-linear-gradient(
                90deg,
                rgba(0,0,0,0.22) 0px,
                transparent 6px,
                rgba(255,255,255,0.03) 8px,
                transparent 14px,
                rgba(0,0,0,0.15) 20px,
                transparent 26px,
                rgba(0,0,0,0.08) 28px,
                transparent 34px,
                rgba(0,0,0,0.2) 40px,
                transparent 46px,
                rgba(255,255,255,0.02) 48px,
                transparent 54px,
                rgba(0,0,0,0.18) 56px,
                transparent 62px
              ),
              linear-gradient(90deg, #1a0808 0%, #621111 28%, #8b1c1c 58%, #7a1515 78%, #5c0e0e 100%)
            `,
            boxShadow: 'inset -30px 0 60px rgba(0,0,0,0.7), inset -5px 0 15px rgba(0,0,0,0.9)',
          }} />
        </div>

        {/* ══ RIGHT CURTAIN ══ */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '50%', height: '100%',
          animation: isOpening ? 'curtainRight 1.8s cubic-bezier(0.76,0,0.24,1) forwards' : 'none',
          zIndex: 3,
        }}>
          <div style={{
            width: '100%', height: '100%',
            background: `
              repeating-linear-gradient(
                90deg,
                rgba(0,0,0,0.18) 0px,
                transparent 6px,
                rgba(255,255,255,0.03) 8px,
                transparent 14px,
                rgba(0,0,0,0.2) 20px,
                transparent 26px,
                rgba(0,0,0,0.1) 30px,
                transparent 36px,
                rgba(0,0,0,0.15) 40px,
                transparent 46px,
                rgba(255,255,255,0.02) 50px,
                transparent 56px,
                rgba(0,0,0,0.22) 60px,
                transparent 66px
              ),
              linear-gradient(270deg, #1a0808 0%, #621111 28%, #8b1c1c 58%, #7a1515 78%, #5c0e0e 100%)
            `,
            boxShadow: 'inset 30px 0 60px rgba(0,0,0,0.7), inset 5px 0 15px rgba(0,0,0,0.9)',
          }} />
        </div>

        {/* ══ PELMET (top valance) ══ */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
          animation: isOpening ? 'pelmetUp 1.8s cubic-bezier(0.76,0,0.24,1) forwards' : 'none',
        }}>
          {/* Stage lights row */}
          <div style={{
            position: 'absolute', top: 2, left: 0, right: 0,
            display: 'flex', justifyContent: 'space-around',
            padding: '0 40px', zIndex: 12,
          }}>
            {[0,1,2,3,4,5,6,7].map(i => (
              <StageLight key={i} x={0} />
            ))}
          </div>

          <PelmetSVG />

          {/* Tassels row */}
          <div style={{
            position: 'relative', height: 58,
            display: 'flex', justifyContent: 'space-around',
            padding: '0 20px', alignItems: 'flex-start', paddingTop: 0,
          }}>
            {[...Array(14)].map((_, i) => (
              <div key={i} className="tassel" style={{ position: 'relative', top: -8 }}>
                <Tassel x="0" />
              </div>
            ))}
          </div>

          {/* Second gold rope */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, #5c3d0a, ${GOLD_LIGHT}, #c9912e, ${GOLD_LIGHT}, #5c3d0a)`,
            opacity: 0.6,
          }} />
        </div>

        {/* ══ SIDE TRIM ROPES ══ */}
        {/* Left vertical gold trim */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: 6, height: '100%', zIndex: 5,
          background: `linear-gradient(90deg, #5c3d0a, ${GOLD_LIGHT}, #c9912e)`,
          opacity: 0.6,
        }} />
        {/* Right vertical gold trim */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 6, height: '100%', zIndex: 5,
          background: `linear-gradient(270deg, #5c3d0a, ${GOLD_LIGHT}, #c9912e)`,
          opacity: 0.6,
        }} />

        {/* ══ CENTER CONTENT ══ */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
          animation: isOpening ? 'fadeOut 0.7s ease-in forwards' : 'none',
          pointerEvents: 'none',
        }}>

          {/* Ornate decorative box */}
          <div style={{
            position: 'relative',
            padding: '44px 56px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center',
          }}>
            {/* Corner ornaments */}
            <div style={{ position: 'absolute', top: 0, left: 0 }}>
              <CornerOrnament />
            </div>
            <div style={{ position: 'absolute', top: 0, right: 0, transform: 'scaleX(-1)' }}>
              <CornerOrnament />
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'scaleY(-1)' }}>
              <CornerOrnament />
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'scale(-1,-1)' }}>
              <CornerOrnament />
            </div>

            {/* Top border line */}
            <div style={{
              position: 'absolute', top: 14, left: 50, right: 50, height: 1,
              background: `linear-gradient(90deg, transparent, ${GOLD}88, transparent)`,
              animation: 'borderGlow 3s ease-in-out infinite',
            }} />
            {/* Bottom border line */}
            <div style={{
              position: 'absolute', bottom: 14, left: 50, right: 50, height: 1,
              background: `linear-gradient(90deg, transparent, ${GOLD}88, transparent)`,
              animation: 'borderGlow 3s ease-in-out 1.5s infinite',
            }} />

            {/* Masks emoji */}
            <div style={{
              fontSize: '3.2rem', marginBottom: 16,
              filter: 'drop-shadow(0 4px 20px rgba(201,145,46,0.4))',
              animation: 'fadeInDown 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both',
            }}>
              🎭
            </div>

            {/* Main title */}
            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
              fontWeight: 700,
              color: IVORY,
              letterSpacing: '0.18em',
              margin: 0,
              lineHeight: 1,
              textShadow: `0 2px 20px rgba(0,0,0,0.9), 0 0 50px rgba(201,145,46,0.15)`,
              animation: 'fadeInDown 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both',
            }}>
              TEATRO
            </h1>

            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              fontWeight: 400,
              color: GOLD,
              letterSpacing: '0.5em',
              margin: '4px 0 0',
              animation: 'fadeInDown 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both',
            }}>
              — U N A —
            </div>

            {/* Ornamental separator */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              margin: '20px 0 16px',
              animation: 'scaleIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both',
            }}>
              <div style={{ height: 1, width: 60, background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
              <svg viewBox="0 0 24 24" width={18} height={18}>
                <path d="M12,2 L14,9 L21,9 L15.5,13.5 L17.5,21 L12,16.5 L6.5,21 L8.5,13.5 L3,9 L10,9 Z"
                  fill={GOLD_LIGHT} stroke={GOLD} strokeWidth="0.5" />
              </svg>
              <div style={{ height: 1, width: 60, background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
            </div>

            {/* Subtitle */}
            <p style={{
              fontFamily: "'IM Fell English SC', serif",
              fontSize: 'clamp(0.7rem, 1.4vw, 0.9rem)',
              color: `${GOLD}cc`,
              letterSpacing: '0.3em',
              margin: '0 0 28px',
              fontWeight: 400,
              animation: 'fadeInUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both',
            }}>
              Sistema de Reserva de Asientos
            </p>

            {/* CTA button */}
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.72rem',
                color: isHovered ? '#1a0a0a' : GOLD_LIGHT,
                letterSpacing: '0.22em',
                padding: '10px 28px',
                border: `1px solid ${GOLD}`,
                background: isHovered
                  ? `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`
                  : 'rgba(201,145,46,0.06)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                animation: `fadeInUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.85s both, ${!isHovered ? 'pulse 2.5s ease-in-out 2s infinite' : 'none'}`,
                pointerEvents: 'auto',
                textTransform: 'uppercase' as const,
                boxShadow: isHovered
                  ? `0 0 30px ${GOLD}66, inset 0 0 0 1px ${GOLD_LIGHT}`
                  : `0 0 15px ${GOLD}22`,
                userSelect: 'none' as const,
              }}
              onClick={() => !isOpening && setIsOpening(true)}
            >
              ✦ &nbsp;Abrir el Telón&nbsp; ✦
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurtainIntro;