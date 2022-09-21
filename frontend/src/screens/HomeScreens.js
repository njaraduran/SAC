import React,{useState,useEffect} from 'react'
import { Row,Col } from 'react-bootstrap'
import Expediente from '../components/Expediente'
import axios from "axios"

function HomeScreens() {
  const [expedietes,setExpedientes] = useState([])
  useEffect(()=>{
    async function fetchExpedientes(){
      const { data } = await axios.get('/api/expedientes/')
      setExpedientes(data)
    }
    fetchExpedientes ()
  },[])

  return (
    <div>
        <h1>Expedientes</h1>
        <Row>
            {expedietes.map(expedietes=>(
                <Col key={expedietes._id} sm={12} md={6} lg={4} xl={3} >
                    <Expediente product={expedietes}/>
                </Col>
            ))}
        </Row> 
    </div>
  )
}

export default HomeScreens