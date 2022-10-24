import React,{ useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams,useNavigate} from "react-router-dom"
import {Row,Col,ListGroup,Button,Card, Form,Accordion,Container,Nav  } from "react-bootstrap"
import axios from 'axios'
// import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listExpedienteDetails,createExpedienteEntrada,createExpedienteDocument} from '../actions/expedienteActions'
import {EXPEDIENTES_CREATE_ENTRADA_RESET,EXPEDIENTES_CREATE_DOCUMENT_RESET} from '../constants/expedienteConstants'
 import fileDownload from 'js-file-download'



function ExpedienteScreen({match}) {
  const [comment,setComment] = useState('')
  const [file,setFile] = useState('')
  const [uploading, setUploading] = useState(false)

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

  const expedienteDocumentCreate = useSelector(state=>state.expedienteDocumentCreate)
  const {
    loading:loadingExpedienteDocument,
    error:errorExpedienteDocument,
    success:successExpedienteDocument
  } = expedienteDocumentCreate


  match= useParams()

  useEffect(()=>{
    
    if (successExpedienteEntrada){
      setComment('')
      dispatch({type:EXPEDIENTES_CREATE_ENTRADA_RESET})
    }
    
    if (successExpedienteDocument){
      setFile('')
      dispatch({type:EXPEDIENTES_CREATE_DOCUMENT_RESET})
    }



    dispatch(listExpedienteDetails(match.id))
  },[dispatch,match,successExpedienteEntrada,successExpedienteDocument])//revisar en caso de que problemas quitar excpedienteid de []

  const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(createExpedienteEntrada(
      {
        comment
      },match.id,
    ))
  }

  const submitHandlerFile= (e) => {
    e.preventDefault()
    dispatch(createExpedienteDocument({
    file
    },match.id,
    ))
}


const [ expedt, setExpedt ] = useState("");
const [ cover, setCever ] = useState();



const newFile = async() => {
  const uploadData = new FormData();
  uploadData.append('Expediente', match.id);
  uploadData.append('file', file, file.name);
  // uploadData.append('User', 'n.jaraduran@outlook.com')
  uploadData.append('name', file.name)
  // uploadData.append('dateUpload','22022-10-10')
  
  // fetch(`http://127.0.0.1:8000/api/expedientes/documents/`, {
  //   method: 'POST',
  //   body: uploadData
  //   })

  // .then( res => history(`/expedientes/${match.id}`))
  // .catch(error => console.log(error))
  
  //



  if (file.length !==0 ){
    setUploading(true)

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
  
        const { data } = await axios.post('/api/expedientes/documents/', uploadData, config)
        .then( res => history(`/expedientes/${match.id}`))
        .catch(error => console.log(error))
  
        setFile(data)
        setUploading(false)     
  
  
    } catch (error) {
        
    }
  }else{
    setUploading(false)
  }


}




  const handleDownload = (url, filename) => {
      axios.get(url, { 
          responseType: 'blob',
      }).then(res => {
          fileDownload(res.data, filename);
          console.log(res);
      }).catch(err => {
          console.log(err);
      })
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
                <Col md={3} >
                  <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <h3>Documentos</h3>
                          {loadingExpedienteDocument && <Loader/>}
                          {successExpedienteDocument && <Message variant='success'>Document ingresada</Message>}
                          {errorExpedienteDocument && <Message variant='danger'>{errorExpedienteDocument}</Message>}

                    <Form onSubmit={newFile}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Agregar archivo</Form.Label>
                        <Form.Control type="file" onChange={(evt)=>setFile(evt.target.files[0])} />
                      </Form.Group>

                      <Button
                            
                            type='submit'
                            variant='primary'
                          >
                            Ingresar
                      </Button>
                    </Form>
                        </ListGroup.Item>

                        {expediente.documents === [] && <Message variant='info'>Sin Documentos</Message>}

                    </ListGroup>


                    
                    <ListGroup variant='flush'>
                    {expediente.documents?.map((document)=>(    
                                 
                          <ListGroup.Item  key = {document._id}>
                            <a onClick={()=>{handleDownload(document.file, document.name)}}>{document.name}</a>
                          </ListGroup.Item>  
                      ) )}                       
                    </ListGroup>
                  </Card>
                </Col>

              </Row>
              
              <Row>
                
                <Col md={9}>  
                    
                <hr
                  style={{
                    background: 'gray',
                    color: 'gray',
                    borderColor: 'gray',
                    height: '3px',
                  }}
                />
                  <h4>Libro de Obras</h4>
                  {expediente.entradas.length === 0 && <Message variant='info'>Sin entradas</Message>}
                  
                  <ListGroup variant='flush'>
                    
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