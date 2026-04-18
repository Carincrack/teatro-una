# 🎭 TEATRO-UNA — Reserva de Asientos
**Examen Parcial I — Fundamentos de Programación Web, I Ciclo 2026**
**Profesora:** Gloriana Peña Ramírez

---

## 🚀 Cómo correr el proyecto

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar servidor de desarrollo
```bash
npm run dev
```
Abrir en el navegador: `http://localhost:5173`

### 3. Build para producción (opcional)
```bash
npm run build
npm run preview
```

---

## 📁 Estructura del proyecto

```
teatro-una/
├── index.html                          # Punto de entrada HTML
├── package.json                        # Dependencias (React, Bootstrap, Vite)
├── vite.config.ts                      # Configuración de Vite
├── tsconfig.json                       # Configuración de TypeScript
├── EJERCICIO_3_INVESTIGACION.md        # Ejercicio 3: Ensayo de investigación
└── src/
    ├── main.tsx                        # Bootstrap de React + Bootstrap CSS
    ├── App.tsx                         # Componente raíz, manejo de estado global
    ├── types/
    │   └── index.ts                    # Interfaces TypeScript (Seat, Row, etc.)
    ├── utils/
    │   └── seatAlgorithm.ts            # ★ Ejercicio 2: función suggest()
    ├── styles/
    │   └── index.css                   # Estilos globales y animaciones CSS
    └── components/
        ├── Navbar.tsx                  # Barra de navegación (Bootstrap)
        ├── Stage.tsx                   # Escenario visual estilo cine
        ├── SeatMap.tsx                 # Mapa completo de asientos (filas A–H)
        ├── Seat.tsx                    # Componente de asiento individual
        ├── ReservationForm.tsx         # Formulario de reserva + botón confirmar
        └── Footer.tsx                  # Pie de página con info del teatro
```

---

## 📋 Ejercicio 1 — Diseño de la sala de teatro

### ¿Qué incluye?

| Requisito | Componente |
|-----------|-----------|
| Representación visual del escenario | `Stage.tsx` — escenario estilo cine con luces animadas |
| Filas y asientos (ocupados/disponibles) | `SeatMap.tsx` + `Seat.tsx` |
| Formulario para elegir cantidad de asientos | `ReservationForm.tsx` |
| Botón para confirmar reserva | `ReservationForm.tsx` → botón "Confirmar Reserva" |
| Pie de página con info del teatro | `Footer.tsx` — nombre, dirección, teléfono, correo |
| HTML semántico | ✅ JSX con elementos semánticos (`nav`, `main`, `footer`) |
| CSS personalizado | ✅ `index.css` + estilos inline con variables |
| Framework Bootstrap | ✅ Bootstrap 5 (`navbar`, `container`, `row`, `col-*`) |

### Tecnologías usadas
- **React 18** + **TypeScript** (componentes funcionales con hooks)
- **Bootstrap 5** — grid, navbar, utilidades responsive
- **Google Fonts** — Playfair Display (títulos) + DM Sans (cuerpo)
- **CSS Animations** — luces del escenario, asientos seleccionados

---

## ⚙️ Ejercicio 2 — Función `suggest()`

Archivo: `src/utils/seatAlgorithm.ts`

### Estructura de datos (según enunciado)
```typescript
interface Seat {
  id: number;      // Identificador entero único
  estado: boolean; // true = ocupado, false = libre
}
```

### Lógica de la función

```typescript
suggest(n: number, rows: Row[]): Set<number>
```

| Caso | Resultado |
|------|-----------|
| `n` > tamaño máximo de fila | `Set` vacío |
| Ninguna fila tiene `n` asientos libres consecutivos | `Set` vacío |
| Hay filas válidas | `Set` con IDs de los asientos de la fila **más cercana al centro** |

**Algoritmo paso a paso:**
1. Validar que `n > 0` y `n <= maxRowSize`
2. Para cada fila, buscar el **primer bloque de `n` asientos libres consecutivos**
3. Calcular distancia al centro: `|índiceFila − (totalFilas−1)/2|`
4. Ordenar candidatos por distancia (menor primero); empate → fila más cercana al escenario
5. Retornar `Set<number>` con los IDs del mejor bloque

### Flujo visual en la app
```
Usuario escribe "3" → suggest(3) → resalta asientos en dorado
                    → usuario presiona "Confirmar"
                    → asientos pasan a verde y se marcan como ocupados
```

---

## 🎨 Decisiones de diseño

- **Tema oscuro** — estética de sala de cine/teatro premium (fondo `#0d0d0d`)
- **Dorado** `#c9a84c` — color institucional del teatro, usado para acentos y CTA
- **Escenario estilo cine** — rectangular con luces animadas, no redondo
- **Leyenda de colores** — disponible (verde oscuro), ocupado (gris), sugerido (dorado), confirmado (verde)
- **Responsive** — funciona en móvil y escritorio gracias al grid de Bootstrap

---

## 📝 Ejercicio 3

Ver archivo: `EJERCICIO_3_INVESTIGACION.md`

**Tema elegido:** Sesgo algorítmico  
**Enfoque:** Análisis crítico y personal desde la perspectiva de un estudiante de programación web.
