import React,{ useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams,useNavigate} from "react-router-dom"
import {Row,Col,ListGroup,Button,Card, Form,Accordion,Container  } from "react-bootstrap"
// import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listExpedienteDetails,createExpedienteEntrada} from '../actions/expedienteActions'
import {EXPEDIENTES_CREATE_ENTRADA_RESET} from '../constants/expedienteConstants'



function ExpedienteScreen({match}) {
  const [comment,setComment] = useState('')

  const dispatch = useDispatch()

  const expedienteDetails = useSelector(state=>state.expedienteDetails)
  const {loading,error,expediente} = expedienteDetails

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  const history = useNavigate()

  const expedienteEntradaCreate = useSelector(state=>state.expedienteEntradaCreate)
  const {
    loading:loadingExpedienteEntrada,
    error:errorExpedienteEntrada,
    success:successExpedienteEntrada
  } = expedienteEntradaCreate


  match= useParams()

  useEffect(()=>{
    
    if (successExpedienteEntrada){
      setComment('')
      dispatch({type:EXPEDIENTES_CREATE_ENTRADA_RESET})
    }

    dispatch(listExpedienteDetails(match.id))
  },[dispatch,match,successExpedienteEntrada])//revisar en caso de que problemas quitar excpedienteid de []

  const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(createExpedienteEntrada(
      {
        comment
      },match.id,
    ))
  }

  return (
    <div>
      <Link to="/expedientes" className='btn btn-dark my-3'>Volver</Link>
      {loading?
        <Loader />
        :error
          ? <Message variant='danger'>{error}</Message>
          :(
            <div>
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

              </Row>

              <Row>
                <Col md={6}>  
                    
                  <h4>Libro de Obras</h4>
                  {expediente.entradas.length === 0 && <Message variant='info'>Sin entradas</Message>}

                  <ListGroup variant='flush'>
                    {/*expediente.entradas.map((entrada)=>(
                      <ListGroup.Item key={entrada._id}>
                        <b>{entrada.name}       {entrada.dateUpload}</b>
                        <p>{entrada.comment}</p>
                      </ListGroup.Item>
                    ))}*/}

                    {expediente.entradas.map((entrada)=>(
                  
                      <Accordion key = {entrada._id}>
                        <Accordion.Item eventKey={entrada._id}>
                          <Accordion.Header> 
                           <Container>  
                              <Row>
                                <Col>Entrada #{entrada._id}</Col>
                                <Col>{entrada.dateUpload}</Col>
                                <Col>{entrada.name}</Col>
                              </Row>
                            </Container>          
                          </Accordion.Header>
                          <Accordion.Body>
                            <p>{entrada.comment}</p>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                  ) )}
                    <ListGroup.Item>

                    

                                  


                      <h4>Nueva entrada</h4>
                      
                      {loadingExpedienteEntrada && <Loader/>}
                      {successExpedienteEntrada && <Message variant='success'>Entrada ingresada</Message>}
                      {errorExpedienteEntrada && <Message variant='danger'>{errorExpedienteEntrada}</Message>}

                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='comment'>
                          <Form.Label>Entrada</Form.Label>
                          <Form.Control
                            as = 'textarea'
                            row = '5'  
                            value = {comment}
                            onChange = {(e)=>setComment(e.target.value)}
                          >                            
                          </Form.Control>
                        </Form.Group>
                        

                        <Button
                          disabled={loadingExpedienteEntrada}
                          type='submit'
                          variant='primary'
                        >
                          Ingresar
                        </Button>

                      </Form>
                    </ListGroup.Item>
                  </ListGroup>

                </Col>
              </Row>



            </div>
          )

      }



    </div>    
  )
}

export default ExpedienteScreen