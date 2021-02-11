import React from "react";
import Topbar from "./components/Topbar";
import LoginForm from "./components/LoginForm"
import News from "./components/News"
import TeamOne from "./components/TeamOne";
import AppDialog from "./components/AppDialog";

import { Route, Switch } from "react-router-dom";
import NavOne from "./components/NavOne";
import Dashboard from "./components/Dashboard";
import AddBlog from "./components/AddBlog";
import AboutOne from "./components/AboutOne";
export default function App() {
  return (
    <div className="App">
      <Topbar />
      <NavOne/>
      <AppDialog/>
      <div>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={News} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/add/blog" component={AddBlog} />
          <Route exact path="/about" component={AboutOne} />
          <Route component={TeamOne} />
        </Switch>
      </div>
    </div>
  );
}
