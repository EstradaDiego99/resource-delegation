import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

/** Template form for the different type of fields. */
export default function ResourceNodeForm({ resourceNode = null, action }) {
  const [nombre, setNombre] = useState("");
  const [unidades, setUnidades] = useState("");

  async function saveResourceNode(e) {
    e.preventDefault();
    const data = { nombre };
    action(data);
  }

  return (
    <form onSubmit={saveResourceNode} className="col- col-md-6 mb-4">
      <p>Este es un form</p>
      <input onChange={(e) => setNombre(e.target.value)}></input>
      <button>Submit</button>
    </form>
  );
}
