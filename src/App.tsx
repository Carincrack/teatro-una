// ============================================================
// App.tsx
// Componente principal: orquesta estado y lógica de la app
// ============================================================

import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Stage from './components/Stage';
import SeatMap from './components/SeatMap';
import ReservationForm from './components/ReservationForm';
import { generateRows } from './utils/seatAlgorithm';
import { Row, ReservationState } from './types';

// Generamos las filas UNA sola vez al montar la aplicación
const initialRows: Row[] = generateRows();

const initialReservationState: ReservationState = {
  selectedSeats: new Set<number>(),
  confirmedSeats: new Set<number>(),
  requestedCount: 0,
  message: '',
  messageType: '',
};

const App: React.FC = () => {
  // Estado de las filas (se actualiza al confirmar para marcar asientos como ocupados)
  const [rows, setRows] = useState<Row[]>(initialRows);

  // Estado de la reserva actual
  const [reservation, setReservation] = useState<ReservationState>(initialReservationState);

  /**
   * Manejador: recibe la sugerencia de suggest() y actualiza el estado
   */
  const handleSuggest = useCallback((seats: Set<number>, count: number) => {
    if (seats.size === 0) {
      const totalFree = rows.reduce((sum, row) => sum + row.seats.filter(s => !s.estado).length, 0);
      setReservation((prev) => ({
        ...prev,
        selectedSeats: new Set<number>(),
        requestedCount: count,
        message:
          count > totalFree
            ? `❌ No hay ${count} asientos disponibles. Asientos libres en total: ${totalFree}.`
            : `❌ No hay asientos disponibles en este momento.`,
        messageType: 'error',
      }));
    } else {
      const isConsecutive = seats.size === count;
      setReservation((prev) => ({
        ...prev,
        selectedSeats: seats,
        requestedCount: count,
        message: isConsecutive
          ? `✨ Se encontraron ${seats.size} asientos consecutivos ideales. Revísalos en el mapa y confirma.`
          : `✨ Se encontraron ${seats.size} asientos disponibles (distribuidos). Los más cercanos para ti. ¡Revísalos y confirma!`,
        messageType: 'info',
      }));
    }
  }, [rows]);

  /**
   * Manejador: confirma la reserva actual
   * - Marca los asientos como ocupados en el estado de filas
   * - Mueve selectedSeats a confirmedSeats
   */
  const handleConfirm = useCallback(() => {
    const { selectedSeats } = reservation;
    if (selectedSeats.size === 0) return;

    // Actualizar estado de asientos → marcar como ocupados (estado: true)
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        seats: row.seats.map((seat) =>
          selectedSeats.has(seat.id) ? { ...seat, estado: true } : seat
        ),
      }))
    );

    // Mover seleccionados a confirmados
    setReservation((prev) => ({
      ...prev,
      selectedSeats: new Set<number>(),
      confirmedSeats: new Set([...prev.confirmedSeats, ...selectedSeats]),
      message: `🎉 ¡Reserva confirmada! ${selectedSeats.size} asiento(s) reservados exitosamente.`,
      messageType: 'success',
    }));
  }, [reservation]);

  /**
   * Manejador: limpiar la selección actual (sin deshacer confirmaciones)
   */
  const handleReset = useCallback(() => {
    setReservation((prev) => ({
      ...prev,
      selectedSeats: new Set<number>(),
      requestedCount: 0,
      message: '',
      messageType: '',
    }));
  }, []);

  /**
   * Manejador: seleccionar/deseleccionar asiento manual
   * - Si es ocupado o confirmado, no hace nada
   * - Si ya está seleccionado, lo deselecciona
   * - Si está libre, lo selecciona
   */
  const handleSelectSeat = useCallback((seatId: number) => {
    setReservation((prev) => {
      const newSelected = new Set(prev.selectedSeats);
      
      if (newSelected.has(seatId)) {
        // Deseleccionar
        newSelected.delete(seatId);
      } else {
        // Seleccionar
        newSelected.add(seatId);
      }

      return {
        ...prev,
        selectedSeats: newSelected,
        requestedCount: newSelected.size,
        message:
          newSelected.size === 0
            ? ''
            : `✨ ${newSelected.size} asiento(s) seleccionado(s). Confirma para reservar.`,
        messageType: newSelected.size === 0 ? '' : 'info',
      };
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#0f0f0f',
        minHeight: '100vh',
        color: '#f0f0f0',
      }}
    >
      {/* ── Navbar (Bootstrap) ── */}
      <Navbar />

      {/* ── Contenido principal ── */}
      <main className="container-fluid" style={{ maxWidth: '1500px', margin: '0 auto', padding: '32px 16px' }}>

        {/* Título de la página */}
        <div className="text-center mb-5">
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: '#f0f0f0',
              letterSpacing: '0.04em',
            }}
          >
            Reserva de Asientos
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: '#888',
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Sala Principal — TEATRO-UNA
          </p>
          <div
            style={{
              width: '60px',
              height: '2px',
              backgroundColor: '#10b981',
              margin: '12px auto 0',
            }}
          />
        </div>

        {/* Escenario */}
        <Stage />

        {/* Layout: Mapa de asientos + Formulario */}
        <div className="row g-4 align-items-start">

          {/* Mapa de asientos */}
          <div className="col-lg-7">
            <div
              style={{
                backgroundColor: '#111',
                border: '1px solid #1a1a1a',
                borderRadius: '12px',
                padding: '32px 24px',
              }}
            >
              <h5
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#10b981',
                  fontSize: '1rem',
                  marginBottom: '20px',
                  letterSpacing: '0.06em',
                }}
              >
                🪑 Mapa de Asientos
              </h5>
              <SeatMap
                rows={rows}
                selectedSeats={reservation.selectedSeats}
                confirmedSeats={reservation.confirmedSeats}
                onSelectSeat={handleSelectSeat}
              />
            </div>
          </div>

          {/* Panel de reserva */}
          <div className="col-lg-5">
            <ReservationForm
              rows={rows}
              reservationState={reservation}
              onSuggest={handleSuggest}
              onConfirm={handleConfirm}
              onReset={handleReset}
            />

            {/* Estadísticas rápidas */}
            <div
              style={{
                backgroundColor: '#111',
                border: '1px solid #1a1a1a',
                borderRadius: '12px',
                padding: '18px',
                marginTop: '16px',
              }}
            >
              <h6
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#10b981',
                  fontSize: '0.9rem',
                  marginBottom: '14px',
                }}
              >
                📊 Estado del teatro
              </h6>
              {[
                {
                  label: 'Total asientos',
                  value: rows.reduce((acc, r) => acc + r.seats.length, 0),
                  color: '#f0f0f0',
                },
                {
                  label: 'Disponibles',
                  value: rows.reduce(
                    (acc, r) => acc + r.seats.filter((s) => !s.estado).length,
                    0
                  ),
                  color: '#10b981',
                },
                {
                  label: 'Ocupados',
                  value: rows.reduce(
                    (acc, r) => acc + r.seats.filter((s) => s.estado).length,
                    0
                  ),
                  color: '#888',
                },
                {
                  label: 'Confirmados hoy',
                  value: reservation.confirmedSeats.size,
                  color: '#10b981',
                },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 0',
                    borderBottom: '1px solid #1a1a1a',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.82rem',
                      color: '#777',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color,
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
