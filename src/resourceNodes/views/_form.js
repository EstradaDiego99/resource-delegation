import React, { useEffect, useState } from "react";
import axios from "../../utils/customAxios.js";
import "react-datepicker/dist/react-datepicker.css";
import IngresosSection from "./_ingresosSection.js";

/** Template form for the different type of fields. */
export default function ResourceNodeForm({ resourceNode = null, action }) {
  const [nombre, setNombre] = useState(resourceNode.nombre);
  const [unidad, setUnidad] = useState(resourceNode.unidad);

  const [esNodoInicial, setEsNodoInicial] = useState(resourceNode.sinIngresos);
  const [esNodoFinal, setEsNodoFinal] = useState(resourceNode.sinEgresos);

  const [ingresos, setIngresos] = useState(resourceNode.ingresos);
  const [egresos, setEgresos] = useState(resourceNode.egresos);

  const [allNodes, setAllNodes] = useState([]);

  async function saveResourceNode(e) {
    e.preventDefault();
    const data = {
      nombre,
      unidad: unidad,
      ingresos,
      egresos,
      sinIngresos: esNodoInicial,
      sinEgresos: esNodoFinal,
    };
    action(data);
  }

  useEffect(() => {
    async function fetchNodes() {
      const res = await axios.get("resourceNodes");
      setAllNodes(res.data);
    }
    fetchNodes();
  }, []);

  return (
    <div className="h-100 d-flex justify-content-center">
      <section className="card p-5 m-3">
        <form
          onSubmit={saveResourceNode}
          class="container-fluid mb-4 bg-red-500"
          style={{ maxWidth: "992px" }}
        >
          <h2 class="text-2xl text-center">Editar nodo de distribución:</h2>

          <div className="d-flex">
            <div className="col-6 p-0">
              <label
                for="nombre"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="..."
                required
              />
            </div>
            <div className="col-6 p-0">
              <label
                for="unidades"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Unidades:
              </label>
              <input
                type="text"
                id="unidades"
                onChange={(e) => setUnidad(e.target.value)}
                value={unidad}
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
                  checked={esNodoInicial}
                />
              </div>
              {esNodoInicial !== true ? (
                <IngresosSection
                  titulo="Ingresos:"
                  {...{ ingresos, setIngresos, unidades: unidad, allNodes }}
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
                  checked={esNodoFinal}
                />
              </div>
              {esNodoFinal !== true ? (
                <IngresosSection
                  titulo="Egresos:"
                  {...{
                    ingresos: egresos,
                    setIngresos: setEgresos,
                    unidades: unidad,
                    allNodes,
                  }}
                />
              ) : (
                <></>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
