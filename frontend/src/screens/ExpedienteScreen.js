import React,{useState, useEffect} from 'react'
import {Link,useParams} from "react-router-dom"
import {Row,Col,Image,ListGroup,Button,Card} from "react-bootstrap"
import Rating from '../components/Rating'
import axios from "axios"


function ProductScreen({match}) {
  const expedienteId = useParams();
  const [expediente,setExpediente] = useState([])

  useEffect(()=>{
    async function fetchExpediente(){
      const { data } = await axios.get(`/api/expedientes/${expedienteId.id}`)
      setExpediente(data)
    }
    fetchExpediente ()
  },[])


  return (
    <div>
      <Link to="/" className='btn btn-dark my-3'>Volver</Link>
      <Row>
        <Col md={6}>
          <Image src={expediente.image} alt={expediente.name}/>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{expediente.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={expediente.rating} text={`${expediente.numReviews} ratings`} color={'#f8e825'}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${expediente.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: ${expediente.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>
                      ${expediente.price}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Estatus:</Col>
                  <Col>
                    {expediente.countInStock>0?'In Stock':'Sin Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button className='btn-block' disabled={expediente.countInStock===0} type='button'>añadir a la cesta</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>    
  )
}

export default ProductScreen