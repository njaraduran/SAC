import React,{useState,useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table,Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listUsers,deleteUser} from '../actions/userActions'
import {useNavigate,Link} from 'react-router-dom'


function UserListScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userList = useSelector(state =>state.userList)
    const {loading,error,users} = userList

    const userLogin = useSelector(state =>state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state =>state.userDelete)
    const {success:succesDelete} = userDelete

    useEffect(() => {
      if (userInfo && userInfo.isAdmin){
        dispatch(listUsers())
      }else{
        navigate('/MainPage')
      }

      
    }, [dispatch,navigate,succesDelete])

    const deleteHandler = (id) => {
      
      if (window.confirm('¿Está seguro de que desea eliminar a este usuario?')){
        dispatch(deleteUser(id))
      }

    }
    

  return (
    <div>

<Row className='align-items-center'>
            <Col>
                <h1>Usuarios</h1>
            </Col>
            <Col align="end">
                <Button className='my-3' as={Link} to="/admin/Register">
                    <i className='fas fa-plus'></i>Crear Usuario
                </Button>
            </Col>
        </Row>
      {loading
        ? (<Loader />)
        : error
          ? (<Message variant='danger'>{error}</Message>)
          : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Cargo</th>
                    <th>Administrador</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {users.map(user=>(
                    <tr key = {user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.cargo}</td>
                      <td>{user.isAdmin ? (
                        <i className='fas fa-check' style={{color:'green'}}></i>
                      ) : (
                        <i className='fas fa-check' style={{color:'red'}}></i>
                      )}</td>
                      <td>
                        <LinkContainer to = {`/admin/${user._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>

                        <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
          )}
    </div>
  )
}

export default UserListScreen