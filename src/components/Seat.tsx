// ============================================================
// components/Seat.tsx
// Componente de asiento individual con estado visual
// ============================================================

import React from 'react';
import { Seat as SeatType } from '../types';

interface SeatProps {
  seat: SeatType;
  isSelected: boolean;
  isConfirmed: boolean;
  onSelect?: (seatId: number) => void;
}

/**
 * Determina el color de fondo de un asiento según su estado:
 * - Ocupado (estado: true) → gris oscuro
 * - Confirmado             → verde
 * - Pre-seleccionado       → dorado parpadeante
 * - Libre                  → verde oscuro apagado
 */
function getSeatStyle(
  seat: SeatType,
  isSelected: boolean,
  isConfirmed: boolean
): React.CSSProperties {
  const base: React.CSSProperties = {
    width: '38px',
    height: '36px',
    borderRadius: '7px 7px 4px 4px',
    border: '1px solid',
    cursor: seat.estado ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.65rem',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    color: '#fff',
    userSelect: 'none',
    position: 'relative',
  };

  if (seat.estado) {
    // Ocupado
    return {
      ...base,
      backgroundColor: '#3a3a3a',
      borderColor: '#555',
      color: '#666',
    };
  }

  if (isConfirmed) {
    // Confirmado
    return {
      ...base,
      backgroundColor: '#065f46',
      borderColor: '#10b981',
      boxShadow: '0 0 8px rgba(16,185,129,0.5)',
    };
  }

  if (isSelected) {
    // Pre-seleccionado por la función suggest
    return {
      ...base,
      backgroundColor: '#10b981',
      borderColor: '#a7f3d0',
      boxShadow: '0 0 10px rgba(16,185,129,0.7)',
      animation: 'seatPulse 1s ease-in-out infinite alternate',
    };
  }

  // Libre
  return {
    ...base,
    backgroundColor: '#064e3b',
    borderColor: '#047857',
  };
}

const SeatComponent: React.FC<SeatProps> = ({ seat, isSelected, isConfirmed, onSelect }) => {
  const style = getSeatStyle(seat, isSelected, isConfirmed);

  const tooltip = seat.estado
    ? 'Ocupado'
    : isConfirmed
    ? `Confirmado #${seat.id}`
    : isSelected
    ? `Seleccionado #${seat.id}`
    : `Click para seleccionar #${seat.id}`;

  const handleClick = () => {
    if (!seat.estado && onSelect) {
      onSelect(seat.id);
    }
  };

  return (
    <div style={style} title={tooltip} onClick={handleClick}>
      {seat.id}
    </div>
  );
};

export default SeatComponent;
