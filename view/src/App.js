import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, NavLink, Navigate} from 'react-router-dom';
import Home from './features/components/Home';
import Login from './features/components/Login';
import Cart from './features/components/Cart';
import {   Navbar, Button, Col, Stack} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const user = false;
  return (
    <Router>
       <Navbar bg='light' expand='lg'>
       <Stack direction="horizontal" gap={3}>
          <Col><NavLink to="/" ><Button variant='primary'>Home</Button></NavLink></Col>
          <Col><NavLink to="/auth/login" ><Button variant='primary' >Login</Button></NavLink></Col>
          <Col><NavLink to="/cart"><Button variant='primary' >Cart</Button></NavLink></Col>
          </Stack>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/auth/login' element={user ? <Navigate to="/" />:<Login />}/>
      </Routes>
  </Router>
  );
}

export default App;
