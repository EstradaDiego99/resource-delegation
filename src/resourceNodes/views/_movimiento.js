import React, { useState } from "react";

/** Template form for the different type of fields. */
export default function Movimiento({
  agregarMovimiento,
  unidades,
  prevConcepto = "",
  prevCantidad = 0,
  allNodes,
  ingresos,
}) {
  const [concepto, setConcepto] = useState(prevConcepto);
  const [cantidad, setCantidad] = useState(prevCantidad);

  const idsIngresos = new Set(Object.keys(ingresos));
  const nodosPosibles = allNodes.filter(
    (node) => node.nombre.indexOf(concepto) > -1 && !idsIngresos.has(node.id)
  );

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
        {nodosPosibles.length > 0 && nodosPosibles.length <= 5 ? (
          <div
            class="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            style={{ display: "block" }}
          >
            {nodosPosibles.map((nodo) => (
              <div className="mb-3" style={{ cursor: "pointer" }}>
                <p
                  onClick={() => setConcepto(nodo.id)}
                  style={{ lineHeight: "4px" }}
                  className="m-0"
                >
                  {nodo.nombre}
                </p>
                <small style={{ fontSize: "0.5em" }}>{nodo.id}</small>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
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
