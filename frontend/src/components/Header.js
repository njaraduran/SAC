import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Container,Nav,Navbar, NavDropdown} from 'react-bootstrap'
import {Link,useNavigate} from "react-router-dom"
import { logout } from '../actions/userActions'

function Header() {
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const logoutHandler = () =>{
    dispatch(logout())
    navigate('/')
    
  }

  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as ={Link} to="/MainPage">Sistema de Administración de Contratos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">  
              <Nav className="mr-auto">       
                {userInfo && 
                  <Nav.Link as ={Link} to="/expedientes" ><i className='fas fa-archive'></i>Expedientes</Nav.Link>
                }
                {userInfo && 
                  <Nav.Link as = {Link} to ="/Message"><i className='far fa-comment-alt'></i>Tareas</Nav.Link>   
                }           
              </Nav>      
              {userInfo &&  userInfo.isAdmin && (
                <NavDropdown title={<span><i className='fas fa-users'></i>Administrador</span>} id = 'Users' className='text-white-50'>           
                  <NavDropdown.Item as = {Link} to ="admin/Register">Registrar Usuarios</NavDropdown.Item>
                  <NavDropdown.Item as = {Link} to ="admin/ListUsers">Usuarios</NavDropdown.Item>
                  <NavDropdown.Item as = {Link} to ="admin/expedientes">Expedientes</NavDropdown.Item>
                </NavDropdown>
              )}


          </Navbar.Collapse>
          {userInfo && (
            <NavDropdown title={userInfo.name} id = 'username' className='text-white-50'>
              <NavDropdown.Item as = {Link} to ="/profile">Perfil</NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>Salir</NavDropdown.Item>
            </NavDropdown>
          )}

          

        </Container>
      </Navbar>
    </header>
  )
}

export default Header