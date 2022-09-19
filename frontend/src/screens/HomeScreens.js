import React from 'react'
import { Row,Col } from 'react-bootstrap'
import Expediente from '../components/Expediente'
import products from '../Products'

function HomeScreens() {
  return (
    <div>
        <h1>Expedientes</h1>
        <Row>
            {products.map(products=>(
                <Col key={products._id} sm={12} md={6} lg={4} xl={3} >
                    <Expediente product={products}/>
                </Col>
            ))}
        </Row> 
    </div>
  )
}

export default HomeScreens