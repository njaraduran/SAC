import React,{useState,useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table,Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listExpedientes,deleteExpediente,createExpediente} from '../actions/expedienteActions'
import {useNavigate} from 'react-router-dom'
import {EXPEDIENTES_CREATE_RESET} from '../constants/expedienteConstants'

function ExpedienteListScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const expedienteList = useSelector(state =>state.expedienteList)
    const {loading,error,expedientes} = expedienteList

    const expedienteDelete= useSelector(state =>state.expedienteDelete)
    const {loading:loadingDelete,error:errorDelete,success:succesDelete} = expedienteDelete

    const expedienteCreate= useSelector(state =>state.expedienteCreate)
    const {loading:loadingCreate,error:errorCreate,success:successCreate,expediente:createdExpediente} = expedienteCreate

    const userLogin = useSelector(state =>state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {
      dispatch({type:EXPEDIENTES_CREATE_RESET})

      if (!userInfo.isAdmin){
        navigate('/MainPage')
      }

      if (successCreate){
        navigate(`/admin/expedientes/${createdExpediente._id}/edit`)
      }else{
        dispatch(listExpedientes())
      }

      
    }, [dispatch,navigate,userInfo,succesDelete,successCreate,createdExpediente])

    const deleteHandler = (id) => {
      
      if (window.confirm('¿Está seguro de que desea eliminar a este expediente?')){
        dispatch(deleteExpediente(id))
      }

    }
    
    const createExpedienteHandler = () =>{
        dispatch(createExpediente())
      }
  
  
return (
    <div>
        <Row className='align-items-center'>
            <Col>
              <h1>Expedientes</h1>
            </Col>
            <Col align="end">
              <Button className='my-3' onClick={createExpedienteHandler}>
                  <i className='fas fa-plus'></i>Crear Expediente
              </Button>
            </Col>
        </Row>

        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
  
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
                    <th>Encargado</th>
                    <th>Contratista</th>
                    <th>Etapa</th>
                    <th>Estado</th>
                    <th>Fecha de Inicio</th>
                    <th>Fecha de Termino</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {expedientes.map(expediente=>(
                    <tr key = {expediente._id}>
                      <td>{expediente._id}</td>                      
                      <td>{expediente.name}</td>
                      <td>{expediente.asignTo}</td>
                      <td>{expediente.contratist}</td>
                      <td>{expediente.stage}</td>
                      <td>{expediente.state}</td>
                      <td>{expediente.dateStart}</td>
                      <td>{expediente.dateEnd}</td>



                      <td>
                        <LinkContainer to = {`/admin/expedientes/${expediente._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>

                        <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(expediente._id)}>
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

export default ExpedienteListScreen