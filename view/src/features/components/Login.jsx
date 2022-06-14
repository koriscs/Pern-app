import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Form, } from 'react-bootstrap';


export default function Login() {

  const google = () =>{
    window.open("http://localhost:3000/auth/google","_self");
  }

  return (
    <Container>
      <Button onClick={google} >Google</Button>
      <Form>
        <Form.Group>
          <Form.Control type="username" name="username" placeholder='Username'></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control type="password" name='password' placeholder='Password'></Form.Control>
        </Form.Group>
      </Form>
    </Container>
  )
}
