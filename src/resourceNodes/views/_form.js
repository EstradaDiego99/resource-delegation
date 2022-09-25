import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Movimientos from "./movimientos.js";

/** Template form for the different type of fields. */
export default function ResourceNodeForm({ resourceNode = null, action }) {
  const [nombre, setNombre] = useState("");
  const [unidades, setUnidades] = useState("");
  const [nodoInicial, setNodoInicial] = useState(false);
  const [ingresos, setIngresos] = useState([{ nombre: "", cantidad: 0 }]);

  const [ingresosCantidad, setIngresosCantidad] = useState(0);

  async function saveResourceNode(e) {
    e.preventDefault();
    const data = { nombre };
    action(data);
  }

  return (
    <form onSubmit={saveResourceNode} class="col- col-md-6 mb-4 bg-red-500">
      <p class="text-2xl">Nuevo nodo</p>
      <div>
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
      <div>
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
          onChange={(e) => setNodoInicial(e.target.value)}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Doe"
          required
        />
      </div>
      <section>
        <div id="ingresos">
          {ingresos.map((ingreso) => (
            <Movimientos
              onChangeFunction={() => {
                setIngresos();
              }}
              lista={ingresos}
              movimiento={"Ingreso"}
            ></Movimientos>
          ))}
        </div>
        <button
          onClick={() => {
            setIngresos((ingresos) => {
              ingresos.concat({ nombre: "", cantidad: 0 });
            });
          }}
        >
          Añadir nuevo ingreso
        </button>
      </section>
      <button>Submit</button>
    </form>
  );
}
