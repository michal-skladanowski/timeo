import React from "react";
import "./App.css";
import DashboardView from "./Views/DashboardView/DashboardView";
import ProjectsView from "./Views/ProjectsView/ProjectsView";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DashboardView} />
          <Route path="/projects" component={ProjectsView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
