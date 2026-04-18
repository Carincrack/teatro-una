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
  const [inputError, setInputError] = useState<string>('');

  const maxRowSize = 20; // Máximo de asientos a reservar

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Si está vacío, permitir
    if (value === '') {
      setInputValue('');
      setInputError('');
      return;
    }

    const numValue = parseInt(value, 10);

    // Si es inválido, no hacer nada
    if (isNaN(numValue)) {
      return;
    }

    // Si excede el máximo
    if (numValue > maxRowSize) {
      setInputError(`❌ Máximo 20 asientos permitidos por reserva.`);
      // No actualizar el valor, mantener el anterior
      return;
    }

    // Si es válido, actualizar
    setInputValue(value);
    setInputError('');
  };

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
        padding: '18px',
        maxWidth: '100%',
      }}
    >
      <h5
        style={{
          fontFamily: "'Playfair Display', serif",
          color: '#10b981',
          fontSize: '1rem',
          marginBottom: '14px',
          borderBottom: '1px solid #1a1a1a',
          paddingBottom: '10px',
        }}
      >
        🎟️ Reservar
      </h5>

      {/* Instrucciones */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.7rem',
          color: '#888',
          marginBottom: '10px',
          lineHeight: '1.3',
        }}
      >
        💡 Clickea asientos o busca consecutivos.
      </p>

      {/* Input cantidad de asientos */}
      <div style={{ marginBottom: '10px' }}>
        <label
          htmlFor="seatCount"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            color: '#ccc',
            display: 'block',
            marginBottom: '4px',
          }}
        >
          Cantidad (máx. {maxRowSize}):
        </label>
        <input
          id="seatCount"
          type="number"
          min={1}
          max={maxRowSize}
          value={inputValue}
          onChange={handleInputChange}
          style={{
            width: '100%',
            backgroundColor: '#1a1a1a',
            border: inputError ? '1px solid #c04040' : '1px solid #2d3d35',
            borderRadius: '6px',
            color: '#f0f0f0',
            padding: '8px 10px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.9rem',
            outline: 'none',
          }}
        />
      </div>

      {/* Mensaje de error si excede máximo */}
      {inputError && (
        <div
          style={{
            backgroundColor: 'rgba(192,64,64,0.2)',
            border: '1px solid #c04040',
            borderRadius: '6px',
            padding: '8px',
            marginBottom: '10px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            color: '#e07070',
            lineHeight: '1.3',
          }}
        >
          {inputError}
        </div>
      )}

      {/* Botón: Buscar asientos */}
      <button
        onClick={handleSuggest}
        style={{
          width: '100%',
          backgroundColor: '#10b981',
          border: 'none',
          borderRadius: '6px',
          color: '#fff',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: '0.8rem',
          letterSpacing: '0.05em',
          padding: '10px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          marginBottom: '10px',
          textTransform: 'uppercase',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#10b981')}
      >
        🔍 Buscar
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
            borderRadius: '6px',
            padding: '8px',
            marginBottom: '10px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            color:
              messageType === 'success'
                ? '#a7f3d0'
                : messageType === 'error'
                ? '#e07070'
                : '#6ee7b7',
            lineHeight: '1.3',
          }}
        >
          {message}
        </div>
      )}

      {/* Asientos seleccionados */}
      {selectedSeats.size > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem',
              color: '#888',
              marginBottom: '4px',
            }}
          >
            Sugeridos:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {[...selectedSeats].sort((a, b) => a - b).map((id) => (
              <span
                key={id}
                style={{
                  backgroundColor: '#10b981',
                  color: '#fff',
                  borderRadius: '3px',
                  padding: '2px 6px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.7rem',
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
        <div style={{ marginBottom: '10px' }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem',
              color: '#888',
              marginBottom: '4px',
            }}
          >
            Confirmados:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {[...confirmedSeats].sort((a, b) => a - b).map((id) => (
              <span
                key={id}
                style={{
                  backgroundColor: '#065f46',
                  color: '#a7f3d0',
                  borderRadius: '3px',
                  padding: '2px 5px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.65rem',
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

      {/* Botones: Confirmar y Resetear */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {selectedSeats.size > 0 && (
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              backgroundColor: '#065f46',
              border: '1px solid #10b981',
              borderRadius: '6px',
              color: '#fff',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              padding: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#047857')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#065f46')}
          >
            ✅ Confirmar
          </button>
        )}

        <button
          onClick={onReset}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: '1px solid #2d3d35',
            borderRadius: '6px',
            color: '#6ee7b7',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: '0.75rem',
            padding: '8px',
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
          ↺ Limpiar
        </button>
      </div>
    </div>
  );
};

export default ReservationForm;
