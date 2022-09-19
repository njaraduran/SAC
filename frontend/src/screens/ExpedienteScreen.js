import React from 'react'
import {Link,useParams} from "react-router-dom"
import {Row,Col,Image,ListGroup,Button,Card} from "react-bootstrap"
import Rating from '../components/Rating'
import products from '../Products'

function ProductScreen() {
  const product_id = useParams();
  const product = products.find((p)=>p._id === product_id.id)
  return (
    <div>
      <Link to="/" className='btn btn-dark my-3'>Volver</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name}/>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} ratings`} color={'#f8e825'}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: ${product.description}
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
                      ${product.price}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Estatus:</Col>
                  <Col>
                    {product.countInStock>0?'In Stock':'Sin Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button className='btn-block' disabled={product.countInStock===0} type='button'>añadir a la cesta</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>    
  )
}

export default ProductScreen