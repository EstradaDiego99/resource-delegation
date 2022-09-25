import React, { useState } from "react";
import Movimiento from "./_movimiento.js";

export default function IngresosSection({
  ingresos,
  setIngresos,
  unidades,
  titulo,
}) {
  const [mostrarNuevoIngreso, setMostrarNuevoIngreso] = useState(false);

  function agregarMovimiento(concepto, cantidad) {
    if (concepto === "") {
      return;
    }
    const nuevosIngresos = { ...ingresos };
    nuevosIngresos[concepto] = cantidad;
    setIngresos(nuevosIngresos);
    setMostrarNuevoIngreso(false);
  }

  return (
    <section id="ingresos" className="container card">
      <h3>{titulo}</h3>
      <div>
        {Object.entries(ingresos).map(([concepto, cantidad]) => (
          <Movimiento
            key={concepto}
            {...{
              agregarMovimiento,
              unidades,
              prevConcepto: concepto,
              prevCantidad: cantidad,
            }}
          />
        ))}
      </div>
      {mostrarNuevoIngreso ? (
        <Movimiento {...{ agregarMovimiento, unidades }} />
      ) : (
        <button onClick={() => setMostrarNuevoIngreso(true)}>
          + Añadir nuevo movimiento
        </button>
      )}
    </section>
  );
}
