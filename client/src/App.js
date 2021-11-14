import React from "react";
import {BrowserRouter ,Routes,Route,NavLink,Link} from "react-router-dom";


import LoginRegister from "./LoginRegister";
import Home from "./Home";
import Tasks from "./Tasks";
import  Lists from "./Lists";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";


function App() {
  return (
    <BrowserRouter>
        <div className="App">

            <div className="header">
              <NavLink   style={({ isActive }) => ({ color: isActive ? "green" : "blue" })} to="/">SignIn</NavLink>
              <NavLink style={({ isActive }) => ({ color: isActive ? "green" : "blue" })} to="/home">Home</NavLink>
              <NavLink style={({ isActive }) => ({ color: isActive ? "green" : "blue" })} to="/tasks">Tasks</NavLink>
              <NavLink style={({ isActive }) => ({ color: isActive ? "green" : "blue" })} to="/lists">Lists</NavLink>
            </div>
            <div className="content">
              <Routes>
                  <Route exact path='/' element={<PublicRoute/>}>
                      <Route exact path='/' element={<LoginRegister/>}/>
                  </Route>
                  <Route exact path='/home' element={<PrivateRoute/>}>
                      <Route exact path='/home' element={<Home/>}/>
                  </Route>
                  <Route exact path='/tasks' element={<PrivateRoute/>}>
                      <Route exact path='/tasks' element={<Tasks/>}/>
                  </Route>
                  <Route exact path='/lists' element={<PrivateRoute/>}>
                      <Route exact path='/lists' element={<Lists/>}/>
                  </Route>
              </Routes>

            </div>

        </div>
     </BrowserRouter>

  );
}

export default App;
