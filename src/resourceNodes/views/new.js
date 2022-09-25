import React from "react";
import { useHistory } from "react-router-dom";

import axios from "../../utils/customAxios.js";
import ResourceNodesForm from "./_form.js";

/** View for new pokemon instance. */
export default function NewResourceNode() {
  const history = useHistory();

  async function createResourceNode(resourceNode) {
    const res = await axios.post("resourceNodes", resourceNode);

    const successResponseMsg = res.data.msg;
    alert(successResponseMsg);
    history.push(`/${res.data.id}`);

    return res;
  }

  return (
    <main id="resources-new" className="container p-3 align-items-center">
      <ResourceNodesForm action={createResourceNode} />
    </main>
  );
}
