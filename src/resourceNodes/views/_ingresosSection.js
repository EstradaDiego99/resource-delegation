import React, { useState } from "react";
import Movimiento from "./_movimiento.js";

export default function IngresosSection({
  ingresos,
  setIngresos,
  unidades,
  titulo,
  allNodes,
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
    <section id="ingresos" className="container card w-100">
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
              allNodes,
              ingresos,
            }}
          />
        ))}
      </div>
      {mostrarNuevoIngreso ? (
        <Movimiento {...{ agregarMovimiento, unidades, allNodes, ingresos }} />
      ) : (
        <button onClick={() => setMostrarNuevoIngreso(true)}>
          + Añadir nuevo movimiento
        </button>
      )}
    </section>
  );
}
