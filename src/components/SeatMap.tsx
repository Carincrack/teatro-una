// ============================================================
// components/SeatMap.tsx
// Mapa de asientos del teatro: distribución tipo cine con pasillos
// ============================================================

import React from 'react';
import { Row } from '../types';
import SeatComponent from './Seat';

interface SeatMapProps {
  rows: Row[];
  selectedSeats: Set<number>;
  confirmedSeats: Set<number>;
  onSelectSeat?: (seatId: number) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ rows, selectedSeats, confirmedSeats, onSelectSeat }) => {
  // Función para dividir asientos en bloques (izq, centro, derecha)
  const getSeatBlocks = (seats: typeof rows[0]['seats']) => {
    const total = seats.length;
    const leftSize = Math.floor(total / 3);
    const rightSize = Math.floor(total / 3);
    const centerSize = total - leftSize - rightSize;

    return {
      left: seats.slice(0, leftSize),
      center: seats.slice(leftSize, leftSize + centerSize),
      right: seats.slice(leftSize + centerSize),
    };
  };

  return (
    <div
      style={{
        padding: '14px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Pantalla del cine */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '16px',
          fontSize: '0.8rem',
          color: '#10b981',
          fontWeight: 600,
          letterSpacing: '0.1em',
        }}
      >
        🎬 PANTALLA 🎬
      </div>

      {rows.map((row) => {
        const { left, center, right } = getSeatBlocks(row.seats);

        return (
          <div
            key={row.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0',
              marginBottom: '10px',
              width: '100%',
            }}
          >
            {/* Etiqueta fila (izquierda) */}
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '0.9rem',
                color: '#10b981',
                width: '22px',
                textAlign: 'center',
                flexShrink: 0,
              }}
            >
              {row.label}
            </span>

            {/* BLOQUE IZQUIERDO */}
            <div style={{ display: 'flex', gap: '7px' }}>
              {left.map((seat) => (
                <SeatComponent
                  key={seat.id}
                  seat={seat}
                  isSelected={selectedSeats.has(seat.id)}
                  isConfirmed={confirmedSeats.has(seat.id)}
                  onSelect={onSelectSeat}
                />
              ))}
            </div>

            {/* PASILLO CENTRAL */}
            <div
              style={{
                width: '18px',
                height: '36px',
                margin: '0 6px',
              }}
            />

            {/* BLOQUE CENTRO */}
            <div style={{ display: 'flex', gap: '7px' }}>
              {center.map((seat) => (
                <SeatComponent
                  key={seat.id}
                  seat={seat}
                  isSelected={selectedSeats.has(seat.id)}
                  isConfirmed={confirmedSeats.has(seat.id)}
                  onSelect={onSelectSeat}
                />
              ))}
            </div>

            {/* PASILLO CENTRAL */}
            <div
              style={{
                width: '18px',
                height: '36px',
                margin: '0 6px',
              }}
            />

            {/* BLOQUE DERECHO */}
            <div style={{ display: 'flex', gap: '7px' }}>
              {right.map((seat) => (
                <SeatComponent
                  key={seat.id}
                  seat={seat}
                  isSelected={selectedSeats.has(seat.id)}
                  isConfirmed={confirmedSeats.has(seat.id)}
                  onSelect={onSelectSeat}
                />
              ))}
            </div>

            {/* Etiqueta fila (derecha) */}
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '0.9rem',
                color: '#10b981',
                width: '22px',
                textAlign: 'center',
                flexShrink: 0,
              }}
            >
              {row.label}
            </span>
          </div>
        );
      })}

      {/* Leyenda */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '20px',
          flexWrap: 'wrap',
        }}
      >
        {[
          { color: '#064e3b', border: '#047857', label: 'Disponible' },
          { color: '#3a3a3a', border: '#555',    label: 'Ocupado' },
          { color: '#10b981', border: '#a7f3d0', label: 'Sugerido' },
          { color: '#065f46', border: '#10b981', label: 'Confirmado' },
        ].map(({ color, border, label }) => (
          <div
            key={label}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <div
              style={{
                width: '22px',
                height: '20px',
                borderRadius: '5px 5px 3px 3px',
                backgroundColor: color,
                border: `1px solid ${border}`,
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                color: '#aaa',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
