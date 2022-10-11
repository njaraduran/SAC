import React,{ useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams} from "react-router-dom"
import {Row,Col,ListGroup,Button,Card} from "react-bootstrap"
// import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listExpedienteDetails} from '../actions/expedienteActions'



function ExpedienteScreen({match}) {
  const dispatch = useDispatch()
  const expedienteDetails = useSelector(state=>state.expedienteDetails)
  const {loading,error,expediente} = expedienteDetails
  match= useParams()

  useEffect(()=>{
    dispatch(listExpedienteDetails(match.id))
  },[dispatch,match])//revisar en caso de que problemas quitar excpedienteid de []

  return (
    <div>
      <Link to="/MainPage" className='btn btn-dark my-3'>Volver</Link>
      {loading?
        <Loader />
        :error
          ? <Message variant='danger'>{error}</Message>
          :(
              <Row>
              <Col md={6}>
      
              <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{expediente.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Descripción: ${expediente.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
      
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>Detalles</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Creado por: {expediente.user}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Asigando a: {expediente.asignTo}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Contratista: {expediente.contratist}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Etapa: {expediente.stage}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Estado: {expediente.state}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Fecha de Inicio: {expediente.dateStart}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Fecha de Termino: {expediente.dateEnd}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <h3>Documentos</h3>
                      </ListGroup.Item>
              
      
                    <ListGroup.Item>
                      <Button className='btn-block' type='button'>Cargar Documento</Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <Col md={3}>
      
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>Libro de Obras</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                  Sección para el libro de obras
                  </ListGroup.Item>
              </ListGroup>
                
              </Col>
            </Row>
          )

      }



    </div>    
  )
}

export default ExpedienteScreen