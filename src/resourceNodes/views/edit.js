import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import axios from "../../utils/customAxios.js";
import ResourceNodeForm from "./_form.js";

/** View for new pokemon instance. */
export default function ResourceNodeEdit() {
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

  async function updateResourceNode(resourceNode) {
    const resResourceNode = await axios.put(
      `resourceNodes/${id}`,
      resourceNode
    );
    history.push(`/${resResourceNode.data.id}`);
    return resResourceNode;
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
