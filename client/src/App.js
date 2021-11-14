import React from "react";
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import LoginRegister from "./LoginRegister";
import Home from "./Home";
import Tasks from "./Tasks";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">SignIn</NavLink>
          <NavLink activeClassName="active" to="/home">Home</NavLink>
          <NavLink activeClassName="active" to="/tasks">Tasks</NavLink>
        </div>
        <div className="content">
          <Routes>
            <Route exact path="/">{LoginRegister}</Route>
            <Route exact path="/home">{Home}</Route>
            <Route exact path="/tasks">{Tasks}</Route>
          </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
