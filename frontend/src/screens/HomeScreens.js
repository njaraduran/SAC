import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Row,Col,Button } from 'react-bootstrap'
import Expedientes from '../components/Expediente'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listExpedientes } from '../actions/expedienteActions'
import SearchBox from '../components/SearchBox'
import { useLocation,Link } from 'react-router-dom'




function HomeScreens({history}) {
  const dispatch = useDispatch()
  const expedienteList = useSelector(state=>state.expedienteList)
  const {error,loading,expedientes} =  expedienteList

  const location = useLocation()


  let keyword = location.search
  useEffect(()=>{
    dispatch(listExpedientes(keyword))    
  },[dispatch,keyword])


  
  return (
    
    <div>
        <Row>
        <Col>
        <h1>Expedientes</h1>
        
        </Col>
        <Col align="end">
        
        <Button className='my-3' as={Link} to="/expedientes/reporte">
              <i className='fas fa-plus'></i>Crear Reporte
          </Button>
          
        </Col>
        <SearchBox/>
        </Row>

        
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