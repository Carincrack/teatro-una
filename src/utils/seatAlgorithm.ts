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
 * suggest(n, rows) — Ejercicio 2
 *
 * Busca los mejores asientos disponibles para una reserva de `n` asientos.
 *
 * Reglas:
 *  1. Si n supera el tamaño máximo de cualquier fila → retorna Set vacío.
 *  2. Si ninguna fila tiene n asientos libres consecutivos → retorna Set vacío.
 *  3. Se elige la fila más cercana al CENTRO del teatro.
 *  4. En caso de empate de distancia, se prefiere la fila anterior (más cercana al escenario).
 *
 * @param n     Número de asientos a reservar
 * @param rows  Matriz de filas del teatro
 * @returns     Set con los IDs de los asientos sugeridos
 */
export function suggest(n: number, rows: Row[]): Set<number> {
  // --- Validación 1: n debe ser positivo ---
  if (n <= 0) return new Set<number>();

  // --- Validación 2: n no puede superar el tamaño máximo de fila ---
  const maxRowSize = Math.max(...rows.map((r) => r.seats.length));
  if (n > maxRowSize) return new Set<number>();

  // --- Índice del centro del teatro ---
  // Con 10 filas (0–9) el centro está entre índices 4 y 5 → centro = 4.5
  const centerIndex = (rows.length - 1) / 2;

  // --- Candidatos: filas que pueden alojar n asientos consecutivos libres ---
  interface Candidate {
    distanceToCenter: number;
    rowIndex: number;
    startSeatIndex: number; // primer asiento del bloque disponible
  }

  const candidates: Candidate[] = [];

  rows.forEach((row, rowIndex) => {
    const seats = row.seats;

    // Buscar el primer bloque de n asientos libres consecutivos en esta fila
    let consecutiveFree = 0;
    let blockStart = -1;

    for (let s = 0; s < seats.length; s++) {
      if (!seats[s].estado) {
        // Asiento libre
        if (consecutiveFree === 0) blockStart = s;
        consecutiveFree++;

        if (consecutiveFree === n) {
          // ¡Encontrado! Registrar candidato y dejar de buscar en esta fila
          candidates.push({
            distanceToCenter: Math.abs(rowIndex - centerIndex),
            rowIndex,
            startSeatIndex: blockStart,
          });
          break;
        }
      } else {
        // Asiento ocupado → reiniciar contador
        consecutiveFree = 0;
        blockStart = -1;
      }
    }
  });

  // --- Sin candidatos → Set vacío ---
  if (candidates.length === 0) return new Set<number>();

  // --- Ordenar por distancia al centro (menor primero); empate → fila anterior ---
  candidates.sort((a, b) => {
    if (a.distanceToCenter !== b.distanceToCenter) {
      return a.distanceToCenter - b.distanceToCenter;
    }
    // Empate: preferir la fila de menor índice (más cerca del escenario → centro)
    return a.rowIndex - b.rowIndex;
  });

  // --- Mejor candidato ---
  const best = candidates[0];
  const bestRow = rows[best.rowIndex];
  const result = new Set<number>();

  for (let i = 0; i < n; i++) {
    result.add(bestRow.seats[best.startSeatIndex + i].id);
  }

  return result;
}
