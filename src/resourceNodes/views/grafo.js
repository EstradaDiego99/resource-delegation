import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "../../utils/customAxios.js";

/** Ver el grafo de un nodo. */
export default function ResourceNodesIndex() {
  const [resourceNode, setResourceNode] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchResourceNode() {
      const resShow = await axios
        .get(`resourceNodes/${id}`)
        .catch((err) => err);
      if (resShow instanceof Error) {
        const { msg } = resShow.response.data;
        alert(msg);
      }
      setResourceNode(resShow.data);
    }
    fetchResourceNode();
  }, [id]);

  return <p>Aquí va el grafo a secas {resourceNode?.nombre}</p>;
}
