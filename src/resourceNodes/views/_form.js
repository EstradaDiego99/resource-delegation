import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import IngresosSection from "./_ingresosSection.js";

/** Template form for the different type of fields. */
export default function ResourceNodeForm({ resourceNode = null, action }) {
  const [nombre, setNombre] = useState("");
  const [unidades, setUnidades] = useState("");

  const [esNodoInicial, setEsNodoInicial] = useState(false);
  const [esNodoFinal, setEsNodoFinal] = useState(false);

  const [ingresos, setIngresos] = useState({});
  const [egresos, setEgresos] = useState({});

  async function saveResourceNode(e) {
    e.preventDefault();
    const data = {
      nombre,
      unidades,
      ingresos,
      egresos,
      sinIngresos: esNodoInicial,
      sinEgresos: esNodoFinal,
    };
    action(data);
  }

  return (
    <form onSubmit={saveResourceNode} class="container-fluid mb-4 bg-red-500">
      <h2 class="text-2xl">Registrar nuevo nodo de distribución:</h2>

      <div className="d-flex">
        <div className="col-6 p-0">
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            onChange={(e) => setNombre(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="..."
            required
          />
        </div>
        <div className="col-6 p-0">
          <label
            for="last_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Unidades
          </label>
          <input
            type="text"
            id="last_name"
            onChange={(e) => setUnidades(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="..."
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div>
            <label
              for="last_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Es nodo inicial:
            </label>
            <input
              type="checkbox"
              id="nodo-inicial"
              onChange={(e) => setEsNodoInicial(e.target.checked)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={esNodoInicial}
            />
          </div>
          {esNodoInicial !== true ? (
            <IngresosSection
              titulo="Ingresos:"
              {...{ ingresos, setIngresos, unidades }}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="col-6">
          <div>
            <label
              for="last_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Es nodo final:
            </label>
            <input
              type="checkbox"
              id="nodo-final"
              onChange={(e) => setEsNodoFinal(e.target.checked)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={esNodoFinal}
            />
          </div>
          {esNodoFinal !== true ? (
            <IngresosSection
              titulo="Egresos:"
              {...{
                ingresos: egresos,
                setIngresos: setEgresos,
                unidades: unidades,
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
