import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Row,Col,Form,Button } from 'react-bootstrap'
import Expedientes from '../components/Expediente'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listExpedientes } from '../actions/expedienteActions'
import SearchBoxReporte from '../components/SearchBoxReporte'
import { useLocation,Link } from 'react-router-dom'



function ExpedienteReporteScreen({history}) {
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
          <h1>Reportes</h1>
          
          </Col>
          <Col align="end">
          
          <Button className='my-3' as={Link} to="/expedientes/reporte">
                <i className='fas fa-plus'></i>Generar Reporte
            </Button>
            
          </Col>
          <SearchBoxReporte/>
        </Row>


        {loading ? <Loader/>
          :error?<Message variant='danger'>{error}</Message>
          :
          <Form>
            {expedientes.map(expediente=>(
                // <Col key={expediente._id} sm={12} md={6} lg={4} xl={3} >
                //     <Expedientes expediente={expediente}/>
                // </Col>

                <div key={`default-${expediente._id}`} className="mb-3">
                  <Form.Check 
                    type='checkbox'
                    id={expediente._id}
                    label={expediente.name}
                  />
                </div>
            ))}
          </Form> 
        }    
    </div>
  )
}

export default ExpedienteReporteScreen