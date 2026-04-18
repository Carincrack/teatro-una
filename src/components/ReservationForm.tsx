// ============================================================
// components/ReservationForm.tsx
// Formulario para seleccionar y confirmar reserva de asientos
// ============================================================

import React, { useState } from 'react';
import { Row, ReservationState } from '../types';
import { suggest } from '../utils/seatAlgorithm';

interface ReservationFormProps {
  rows: Row[];
  reservationState: ReservationState;
  onSuggest: (seats: Set<number>, count: number) => void;
  onConfirm: () => void;
  onReset: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  rows,
  reservationState,
  onSuggest,
  onConfirm,
  onReset,
}) => {
  const [inputValue, setInputValue] = useState<string>('1');

  const maxRowSize = Math.max(...rows.map((r) => r.seats.length));

  const handleSuggest = () => {
    const n = parseInt(inputValue, 10);
    if (isNaN(n) || n < 1) return;
    const suggested = suggest(n, rows);
    onSuggest(suggested, n);
  };

  const { selectedSeats, confirmedSeats, message, messageType } = reservationState;

  return (
    <div
      style={{
        backgroundColor: '#111',
        border: '1px solid #1a1a1a',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '420px',
        margin: '0 auto',
      }}
    >
      <h5
        style={{
          fontFamily: "'Playfair Display', serif",
          color: '#10b981',
          fontSize: '1.1rem',
          marginBottom: '20px',
          borderBottom: '1px solid #1a1a1a',
          paddingBottom: '12px',
        }}
      >
        🎟️ Reservar Asientos
      </h5>

      {/* Instrucciones */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.75rem',
          color: '#888',
          marginBottom: '12px',
          lineHeight: '1.4',
        }}
      >
        💡 Haz click en los asientos para seleccionarlos, o usa el buscador para encontrar consecutivos.
      </p>

      {/* Input cantidad de asientos */}
      <div className="mb-3">
        <label
          htmlFor="seatCount"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.85rem',
            color: '#ccc',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          Cantidad de asientos (máx. {maxRowSize}):
        </label>
        <input
          id="seatCount"
          type="number"
          min={1}
          max={maxRowSize}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: '100%',
            backgroundColor: '#1a1a1a',
            border: '1px solid #2d3d35',
            borderRadius: '8px',
            color: '#f0f0f0',
            padding: '10px 14px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            outline: 'none',
          }}
        />
      </div>

      {/* Botón: Buscar asientos */}
      <button
        onClick={handleSuggest}
        style={{
          width: '100%',
          backgroundColor: '#10b981',
          border: 'none',
          borderRadius: '8px',
          color: '#fff',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: '0.9rem',
          letterSpacing: '0.05em',
          padding: '12px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          marginBottom: '12px',
          textTransform: 'uppercase',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#10b981')}
      >
        🔍 Buscar mejores asientos
      </button>

      {/* Mensaje de resultado */}
      {message && (
        <div
          style={{
            backgroundColor:
              messageType === 'success'
                ? 'rgba(16,185,129,0.15)'
                : messageType === 'error'
                ? 'rgba(180,50,50,0.2)'
                : 'rgba(16,185,129,0.1)',
            border: `1px solid ${
              messageType === 'success'
                ? '#10b981'
                : messageType === 'error'
                ? '#c04040'
                : '#059669'
            }`,
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '12px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.85rem',
            color:
              messageType === 'success'
                ? '#a7f3d0'
                : messageType === 'error'
                ? '#e07070'
                : '#6ee7b7',
          }}
        >
          {message}
        </div>
      )}

      {/* Asientos seleccionados */}
      {selectedSeats.size > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              color: '#888',
              marginBottom: '6px',
            }}
          >
            Asientos sugeridos:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {[...selectedSeats].sort((a, b) => a - b).map((id) => (
              <span
                key={id}
                style={{
                  backgroundColor: '#10b981',
                  color: '#fff',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                #{id}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Asientos confirmados */}
      {confirmedSeats.size > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              color: '#888',
              marginBottom: '6px',
            }}
          >
            Asientos confirmados:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {[...confirmedSeats].sort((a, b) => a - b).map((id) => (
              <span
                key={id}
                style={{
                  backgroundColor: '#065f46',
                  color: '#a7f3d0',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: '1px solid #10b981',
                }}
              >
                ✓ #{id}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Botón: Confirmar reserva */}
      {selectedSeats.size > 0 && (
        <button
          onClick={onConfirm}
          style={{
            width: '100%',
            backgroundColor: '#065f46',
            border: '1px solid #10b981',
            borderRadius: '8px',
            color: '#fff',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '0.05em',
            padding: '12px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            marginBottom: '10px',
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#047857')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#065f46')}
        >
          ✅ Confirmar Reserva
        </button>
      )}

      {/* Botón: Resetear */}
      <button
        onClick={onReset}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          border: '1px solid #2d3d35',
          borderRadius: '8px',
          color: '#6ee7b7',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: '0.85rem',
          padding: '10px',
          cursor: 'pointer',
          transition: 'border-color 0.2s, color 0.2s',
          textTransform: 'uppercase',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#10b981';
          e.currentTarget.style.color = '#10b981';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#2d3d35';
          e.currentTarget.style.color = '#6ee7b7';
        }}
      >
        ↺ Limpiar selección
      </button>
    </div>
  );
};

export default ReservationForm;
