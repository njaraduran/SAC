import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Row,Col } from 'react-bootstrap'
import Expedientes from '../components/Expediente'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listExpedientes } from '../actions/expedienteActions'




function HomeScreens() {
  const dispatch = useDispatch()
  const expedienteList = useSelector(state=>state.expedienteList)
  const {error,loading,expedientes} =  expedienteList

  useEffect(()=>{
    dispatch(listExpedientes())    
  },[dispatch])


  
  return (
    <div>
        <h1>Expedientes</h1>

        {loading ? <Loader/>
          :error?<Message variant='danger'>{error}</Message>
          :
          <Row>
            {expedientes.map(expediente=>(
                <Col key={expediente._id} sm={12} md={6} lg={4} xl={3} >
                    <Expedientes expediente={expediente}/>
                </Col>
            ))}
          </Row> 
        }        
    </div>
  )
}

export default HomeScreens