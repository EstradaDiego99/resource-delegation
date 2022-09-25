import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "../../utils/customAxios.js";
import CarpetaNodoDistribucion from "./_carpetaNodoDistribucion.js";

/** Ver el grafo de un nodo. */
export default function ResourceNodesIndex() {
  const { id } = useParams();

  const [nodoDistribucion, setNodoDistribucion] = useState();
  const [nodosIngreso, setNodosIngreso] = useState();

  useEffect(() => {
    async function fetchResourceNode() {
      const resShow = await axios
        .get(`resourceNodes/${id}/grafo`)
        .catch((err) => err);
      if (resShow instanceof Error) {
        const { msg } = resShow.response.data;
        alert(msg);
      }
      const { nodosIngreso, nodoDistribucion } = resShow.data;
      setNodoDistribucion(nodoDistribucion);
      setNodosIngreso(nodosIngreso);
    }
    fetchResourceNode();
  }, [id]);

  if (nodoDistribucion === undefined || nodosIngreso === undefined) {
    return <></>;
  }

  const { nombre, egresos } = nodoDistribucion;

  return (
    <main>
      <h2>{nombre}</h2>
      {nodosIngreso.length > 0 ? (
        <section className="card col-6">
          <p>Ingresos:</p>
          {nodosIngreso?.map((nodo) => (
            <Link to={`/${nodo.id}`}>
              <article key={nodo.id} className="d-flex">
                <h4>{nodo.nombre}</h4>
                <small style={{ fontSize: "1.5em" }}>{`${
                  nodo.egresos[nodoDistribucion.id]
                } ${nodo.unidad}`}</small>
              </article>
            </Link>
          ))}
        </section>
      ) : (
        <></>
      )}
      <section>
        {egresos instanceof Array ? (
          egresos?.map((nodoEgreso) => (
            <CarpetaNodoDistribucion
              key={nodoEgreso.id}
              nodoDistribucion={nodoEgreso}
            />
          ))
        ) : (
          <></>
        )}
      </section>
    </main>
  );
}
