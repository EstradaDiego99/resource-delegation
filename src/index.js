import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import ResourceNodesRoutes from "./resourceNodes/view.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <StrictMode>
      <Switch>
        <Route path="/" component={ResourceNodesRoutes} />
      </Switch>
    </StrictMode>
  </Router>
);
