import React, { useState } from "react";

/** Template form for the different type of fields. */
export default function Movimiento({
  agregarMovimiento,
  unidades,
  prevConcepto = "",
  prevCantidad = 0,
}) {
  const [concepto, setConcepto] = useState(prevConcepto);
  const [cantidad, setCantidad] = useState(prevCantidad);

  return (
    <div className="d-flex row">
      <div className="col-6 p-1">
        <input
          type="text"
          id="concepto"
          onChange={(e) => setConcepto(e.target.value.trim())}
          className="w-100 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="..."
          value={concepto}
          required
        />
      </div>
      <div className="col-3 p-1">
        <input
          type="numeric"
          id="cantidad"
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="w-100 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="..."
          value={cantidad}
          required
        />
      </div>
      <small>{unidades}</small>
      <button
        type="button"
        className="col-2"
        onClick={() => agregarMovimiento(concepto, cantidad)}
      >
        ✅
      </button>
    </div>
  );
}
