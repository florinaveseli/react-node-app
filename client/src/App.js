import React from "react";
import {BrowserRouter ,Routes,Route,NavLink,Link} from "react-router-dom";


import LoginRegister from "./LoginRegister";
import Home from "./Home";
import Tasks from "./Tasks";
function App() {
  return (
    <BrowserRouter>
        <div className="App">

            <div className="header">
              <NavLink   style={({ isActive }) => ({ color: isActive ? "green" : "blue" })} to="/">SignIn</NavLink>
              <NavLink style={({ isActive }) => ({ color: isActive ? "green" : "blue" })} to="/home">Home</NavLink>
              <NavLink style={({ isActive }) => ({ color: isActive ? "green" : "blue" })} to="/tasks">Tasks</NavLink>

            </div>
            <div className="content">
              <Routes>
                <Route exact path="/" element={<LoginRegister/>} />
                <Route exact path="/home" element={<Home/>} />
                <Route exact path="/tasks" element={<Tasks/>}/>
              </Routes>

            </div>

        </div>
     </BrowserRouter>

  );
}

export default App;
