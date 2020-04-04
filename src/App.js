import React from "react";
import "./App.css";
import DashboardView from "./Views/DashboardView/DashboardView";
import ProjectsView from "./Views/ProjectsView/ProjectsView";
import ProjectView from "./Views/ProjectView/ProjectView";
import LoginView from "./Views/LogInView/LoginView";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DashboardView} />
          <Route exact path="/projects" component={ProjectsView} />
          <Route path="/projects/:id" component={ProjectView} />
          <Route path="/login" component={LoginView} />
          <Route path="/signup" component={LoginView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
