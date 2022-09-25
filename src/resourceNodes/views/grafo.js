import React, { useState, useEffect } from "react";
import { ForceGraph2D } from "react-force-graph";
import { useParams, Link, useHistory } from "react-router-dom";

import axios from "../../utils/customAxios.js";
import CarpetaNodoDistribucion from "./_carpetaNodoDistribucion.js";
import "./styles.css";

/** Ver el grafo de un nodo. */
export default function ResourceNodesIndex() {
  const history = useHistory();
  const { id } = useParams();

  const [nodoDistribucion, setNodoDistribucion] = useState();
  const [nodosIngreso, setNodosIngreso] = useState();
  const [listaDeNodos, setListaDeNodos] = useState();
  const [listaDeEnlaces, setListaDeEnlaces] = useState();
  const [insights, setInsights] = useState();

  useEffect(() => {
    async function fetchResourceNode() {
      const resShow = await axios
        .get(`resourceNodes/${id}/grafo`)
        .catch((err) => err);
      if (resShow instanceof Error) {
        const { msg } = resShow.response.data;
        alert(msg);
      }
      const {
        nodosIngreso,
        nodoDistribucion,
        listaDeNodos,
        listaDeEnlaces,
        insights,
      } = resShow.data;
      setNodoDistribucion(nodoDistribucion);
      setNodosIngreso(nodosIngreso);
      setListaDeNodos(listaDeNodos);
      setListaDeEnlaces(listaDeEnlaces);
      setInsights(insights);
    }
    fetchResourceNode();
  }, [id]);

  if (
    nodoDistribucion === undefined ||
    nodosIngreso === undefined ||
    listaDeNodos === undefined ||
    listaDeEnlaces === undefined
  ) {
    return <></>;
  }

  const { nombre, egresos } = nodoDistribucion;

  const valoresEnlaces = listaDeEnlaces.map((enlace) => enlace.value);
  const minEnlace = Math.min(...valoresEnlaces);
  const maxEnlace = Math.max(...valoresEnlaces);
  const diff = maxEnlace - minEnlace;

  for (const enlace of listaDeEnlaces) {
    const valEnlace = enlace.value - minEnlace;
    const proporcion = valEnlace / diff;
    enlace.value = proporcion * 4 + 1;
  }

  for (const nodo of listaDeNodos) {
    if (nodo.sinIngresos) {
      nodo.nodeColor = "red";
    } else if (nodo.sinEgresos) {
      nodo.nodeColor = "green";
    }
  }

  const handleNodeClick = (node) => {
    history.push(`${node.id}`);
  };

  const handleCurrentNodeClick = () => {
    history.push(`${id}/edit`);
  };

  return (
    <div className="d-flex justify-content-center gradient-bg h-100">
      <section className="card p-5 m-3">
        <div class="row">
          <div class="col">
            {" "}
            <div className="d-flex align-content-center flex-wrap col container d-flex justify-content-center">
              <h2 className="row">{nombre}</h2>
              <div className="border border-dark rounded">
                {listaDeNodos !== undefined && listaDeEnlaces !== undefined ? (
                  <ForceGraph2D
                    className="row border border-dark"
                    width={500}
                    height={400}
                    graphData={{ nodes: listaDeNodos, links: listaDeEnlaces }}
                    nodeLabel="nombre"
                    nodeVal={(node) =>
                      node.sinIngresos ? 4 : node.sinEgresos ? 1 : 2
                    }
                    nodeColor={(node) =>
                      node.id === id
                        ? "yellow"
                        : node.sinIngresos
                        ? "#Af2a2e"
                        : node.sinEgresos
                        ? "#49be25"
                        : "#2596be"
                    }
                    linkDirectionalParticles="value"
                    onNodeClick={handleNodeClick}
                  />
                ) : (
                  <></>
                )}
              </div>
              <button
                className="row m-2 btn btn-primary"
                onClick={handleCurrentNodeClick}
              >
                Edit node
              </button>
            </div>
          </div>
          <div class="col">
            {" "}
            <div>
              <h2>Observaciones:</h2>
              <p className="first-insight">{insights[0]}</p>
              <p>{insights[1]}</p>
              <p>{insights[2]}</p>

              {nodosIngreso.length > 0 ? (
                <section className="card w-100 p-4 gradient-bg-green">
                  <h2>Ingresos:</h2>
                  {nodosIngreso?.map((nodo) => (
                    <Link to={`/${nodo.id}`}>
                      <article key={nodo.id} className="d-flex">
                        <h4>{nodo.nombre}:&nbsp;</h4>
                        <small style={{ fontSize: "1.5em" }}>{`${
                          nodo.egresos[nodoDistribucion.id]
                        } ${nodo.unidad || ""}`}</small>
                      </article>
                    </Link>
                  ))}
                </section>
              ) : (
                <></>
              )}

              {egresos.length > 0 ? (
                <section className="card w-100 p-4 gradient-bg-orange">
                  <h2>Egresos:</h2>
                  {egresos?.map((nodo) => (
                    <Link to={`/${nodo.id}`}>
                      <article key={nodo.id} className="d-flex">
                        <h4>{nodo.nombre}:&nbsp;</h4>
                        <small style={{ fontSize: "1.5em" }}>{`${
                          nodo.ingresos[nodoDistribucion.id]
                        } ${nodo.unidad || ""}`}</small>
                      </article>
                    </Link>
                  ))}
                </section>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
