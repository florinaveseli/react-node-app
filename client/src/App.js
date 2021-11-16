import React from "react";
import {BrowserRouter ,Routes,Route,NavLink} from "react-router-dom";


import LoginRegister from "./LoginRegister";
import Home from "./Home";
import Tasks from "./Tasks";
import  Lists from "./Lists";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";

import {Navbar,Nav,Container}  from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
        <div className="App">

                <Navbar bg="dark" variant="dark" className="nav-content">
                    <Container>
                        <Nav className="me-auto">
                    <Nav.Link >   <NavLink    to="/">SignIn</NavLink></Nav.Link>
                    <Nav.Link > <NavLink  to="/home">Home</NavLink></Nav.Link>
                    <Nav.Link ><NavLink to="/tasks">Tasks</NavLink></Nav.Link>
                    <Nav.Link ><NavLink  to="/lists">Lists</NavLink></Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>

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
