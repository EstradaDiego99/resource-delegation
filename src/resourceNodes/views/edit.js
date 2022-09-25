import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import axios from "../../utils/customAxios.js";
import ResourceNodeForm from "./_form.js";

/** View for new pokemon instance. */
export default function PokemonsEdit() {
  const [resourceNode, setResourceNode] = useState();

  const { id } = useParams();
  const history = useHistory();

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

  async function updateResourceNode(pokemon) {
    // const config = { headers: { "Content-Type": "multipart/form-data" } };
    const resPokemon = await axios.post("resourceNodes", pokemon);

    const successResponseMsg = resPokemon.data.msg;
    alert(successResponseMsg);
    history.push(`/resourceNodes/${resPokemon.data.id}`);

    return resPokemon;
  }

  if (!resourceNode) {
    return <></>;
  }

  return (
    <main id="edit-pokemon" className="container-fluid">
      <ResourceNodeForm
        resourceNode={resourceNode}
        action={updateResourceNode}
      />
    </main>
  );
}
