import React from 'react'
import { Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import SearchBox from './SearchBox'


function Expedientes({expediente}) {
    return (
        
      <Card className='my-3 p-3 rounded'>
          <Card.Body>
              <Link to={`/expedientes/${expediente._id}`}>
                  <Card.Title>
                      <strong>{expediente.name}</strong>
                  </Card.Title>
              </Link>
          </Card.Body>
  
  
      </Card>
  
    )
  }
  
  export default Expedientes