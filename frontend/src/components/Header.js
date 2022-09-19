import React from 'react'
import { Container,Nav,Navbar} from 'react-bootstrap'
import {Link} from "react-router-dom"

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as ={Link} to="/">Sistema de Administración de Contratos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as ={Link} to="/expedientes" ><i className='fas fa-archive'></i>Expedientes</Nav.Link>
                <Nav.Link as = {Link} to ="/Documents"><i className='fas fa-file-alt'></i>Documentos</Nav.Link>
                <Nav.Link as = {Link} to ="/Message"><i className='far fa-comment-alt'></i>Mensajes</Nav.Link>
                <Nav.Link as = {Link} to ="/Users"><i className='fas fa-user-alt'></i>Usuarios</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header