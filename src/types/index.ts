// ============================================================
// types/index.ts
// Modelos de datos compartidos en toda la aplicación
// ============================================================

/**
 * Representa un asiento individual del teatro.
 * Ejercicio 2: estructura de objeto requerida por el enunciado.
 */
export interface Seat {
  id: number;       // Identificador único entero
  estado: boolean;  // true = ocupado, false = libre
}

/**
 * Representa una fila completa de asientos.
 */
export interface Row {
  label: string;   // Etiqueta de la fila (A, B, C, ...)
  seats: Seat[];
}

/**
 * Estado de la aplicación relacionado con la reserva.
 */
export interface ReservationState {
  selectedSeats: Set<number>;  // IDs de asientos pre-seleccionados
  confirmedSeats: Set<number>; // IDs confirmados definitivamente
  requestedCount: number;
  message: string;
  messageType: 'success' | 'error' | 'info' | '';
}
