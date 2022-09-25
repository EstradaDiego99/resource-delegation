import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./views/styles.css";

import Grafo from "./views/grafo.js";
import New from "./views/new.js";
import Edit from "./views/edit.js";

/** Switch de las diferentes vistas para una entidad. */
export default function EntitiesRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/new" exact component={New} />
        <Route path="/:id/edit" component={Edit} />
        <Route path="/:id" component={Grafo} />
      </Switch>
    </BrowserRouter>
  );
}
