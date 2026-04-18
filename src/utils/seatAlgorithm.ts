// ============================================================
// utils/seatAlgorithm.ts
// Ejercicio 2: Algoritmo de sugerencia de asientos
// ============================================================

import { Row, Seat } from '../types';

/**
 * Genera la distribución inicial de asientos del teatro.
 * 10 filas estilo cine (A–J), con algunos asientos ocupados aleatoriamente
 * para simular un teatro con actividad previa.
 */
export function generateRows(): Row[] {
  // Cantidad de asientos por fila (estilo cine: más asientos en filas del medio)
  const rowConfig: { label: string; count: number }[] = [
    { label: 'A', count: 12 },
    { label: 'B', count: 14 },
    { label: 'C', count: 16 },
    { label: 'D', count: 18 },
    { label: 'E', count: 20 },
    { label: 'F', count: 20 },
    { label: 'G', count: 18 },
    { label: 'H', count: 16 },
    { label: 'I', count: 14 },
    { label: 'J', count: 12 },
  ];

  // Asientos que estarán ocupados desde el inicio (estado: true)
  // Se definen manualmente para tener control del escenario de prueba
  const occupiedIds = new Set<number>([
    4, 6,               // Fila A
    16, 18, 20,         // Fila B
    32, 34,             // Fila C
    52, 55, 58,         // Fila D
    75, 78,             // Fila E
    100, 105,           // Fila F
    128, 131,           // Fila G
    152, 154,           // Fila H
    172, 175,           // Fila I
    188, 190,           // Fila J
  ]);

  let globalId = 1;
  const rows: Row[] = rowConfig.map(({ label, count }) => {
    const seats: Seat[] = Array.from({ length: count }, () => {
      const seat: Seat = {
        id: globalId,
        estado: occupiedIds.has(globalId), // true = ocupado
      };
      globalId++;
      return seat;
    });
    return { label, seats };
  });

  return rows;
}

/**
 * suggest(n, rows) — Ejercicio 2 (Mejorado)
 *
 * Busca los mejores asientos disponibles para una reserva de `n` asientos.
 *
 * Estrategia:
 *  1. Primero: Intenta encontrar n asientos consecutivos en la misma fila
 *     (preferencia: fila más cercana al centro del teatro)
 *
 *  2. Si falla: Busca los n asientos disponibles más cercanos entre sí,
 *     permitiendo que estén distribuidos en filas cercanas (verticalmente).
 *     Prioriza:
 *     a) Minimizar la distancia total (suma de distancias de cada asiento al centro)
 *     b) Minimizar gaps horizontales dentro de filas
 *     c) Mantener filas adyacentes o lo más próximas posible
 *
 * @param n     Número de asientos a reservar
 * @param rows  Matriz de filas del teatro
 * @returns     Set con los IDs de los asientos sugeridos
 */
export function suggest(n: number, rows: Row[]): Set<number> {
  // --- Validación 1: n debe ser positivo ---
  if (n <= 0) return new Set<number>();

  // --- Validación 2: n no puede superar el tamaño máximo disponible total ---
  const totalFreeSeats = rows.reduce((sum, row) => sum + row.seats.filter(s => !s.estado).length, 0);
  if (n > totalFreeSeats) return new Set<number>();

  // --- Índice del centro del teatro ---
  const centerIndex = (rows.length - 1) / 2;

  // ============================================================
  // FASE 1: Intenta encontrar n asientos consecutivos en una fila
  // ============================================================

  interface Candidate {
    distanceToCenter: number;
    rowIndex: number;
    startSeatIndex: number;
  }

  const consecutiveCandidates: Candidate[] = [];

  rows.forEach((row, rowIndex) => {
    const seats = row.seats;
    let consecutiveFree = 0;
    let blockStart = -1;

    for (let s = 0; s < seats.length; s++) {
      if (!seats[s].estado) {
        if (consecutiveFree === 0) blockStart = s;
        consecutiveFree++;

        if (consecutiveFree === n) {
          consecutiveCandidates.push({
            distanceToCenter: Math.abs(rowIndex - centerIndex),
            rowIndex,
            startSeatIndex: blockStart,
          });
          break;
        }
      } else {
        consecutiveFree = 0;
        blockStart = -1;
      }
    }
  });

  // Si encontramos candidatos consecutivos → usar el mejor
  if (consecutiveCandidates.length > 0) {
    consecutiveCandidates.sort((a, b) => {
      if (a.distanceToCenter !== b.distanceToCenter) {
        return a.distanceToCenter - b.distanceToCenter;
      }
      return a.rowIndex - b.rowIndex;
    });

    const best = consecutiveCandidates[0];
    const bestRow = rows[best.rowIndex];
    const result = new Set<number>();

    for (let i = 0; i < n; i++) {
      result.add(bestRow.seats[best.startSeatIndex + i].id);
    }

    return result;
  }

  // ============================================================
  // FASE 2: Si no hay n consecutivos, busca los más cercanos
  // ============================================================

  interface SeatOption {
    id: number;
    rowIndex: number;
    seatIndex: number;
    distanceToCenter: number;
  }

  // Recopilar todos los asientos libres con su información
  const allFreeSeats: SeatOption[] = [];

  rows.forEach((row, rowIndex) => {
    row.seats.forEach((seat, seatIndex) => {
      if (!seat.estado) {
        allFreeSeats.push({
          id: seat.id,
          rowIndex,
          seatIndex,
          distanceToCenter: Math.abs(rowIndex - centerIndex),
        });
      }
    });
  });

  // Ordenar por proximidad al centro (tanto vertical como horizontalmente)
  // Prioridad: 1) fila cercana al centro, 2) asientos cercanos al centro de la fila
  allFreeSeats.sort((a, b) => {
    // Comparar distancia vertical al centro del teatro
    if (a.distanceToCenter !== b.distanceToCenter) {
      return a.distanceToCenter - b.distanceToCenter;
    }

    // Si están en la misma distancia vertical, compararlos por proximidad al centro de su fila
    const rowA = rows[a.rowIndex];
    const rowB = rows[b.rowIndex];
    const centerSeatIndexA = (rowA.seats.length - 1) / 2;
    const centerSeatIndexB = (rowB.seats.length - 1) / 2;

    const distA = Math.abs(a.seatIndex - centerSeatIndexA);
    const distB = Math.abs(b.seatIndex - centerSeatIndexB);

    if (distA !== distB) {
      return distA - distB;
    }

    // Empate: preferir fila anterior (más cerca del escenario)
    return a.rowIndex - b.rowIndex;
  });

  // Tomar los primeros n asientos más cercanos
  const result = new Set<number>();
  for (let i = 0; i < n && i < allFreeSeats.length; i++) {
    result.add(allFreeSeats[i].id);
  }

  return result;
}
