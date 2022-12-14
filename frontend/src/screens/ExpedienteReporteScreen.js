import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Table,Row,Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listExpedientes } from '../actions/expedienteActions'
import SearchBox from '../components/SearchBox'
import { useLocation} from 'react-router-dom'
import { downloadExcel } from "react-export-table-to-excel";

function ExpedienteReporteScreen({history}) {
  

  const dispatch = useDispatch()
  const expedienteList = useSelector(state=>state.expedienteList)
  const {error,loading,expedientes} =  expedienteList
  const [checked, setChecked] = useState([]);
  const [reports, setReports] = useState([]);


  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked && updatedList.indexOf(event.target.value)===-1) {
      updatedList = [...checked, event.target.value];
    } else {
      if (!event.target.checked && updatedList.indexOf(event.target.value)!==-1){
        updatedList.splice(checked.indexOf(event.target.value), 1);
      }      
    }
    setChecked(updatedList);
  };

  const header = ["D.O.M.: CUADRO DE DISTRIBUCIÓN DE CONTRATOS EN CURSO Y VISUALIZACIÓN CARGAS DE TRABAJO POR I.T.O."];
  
  const checkedItems = checked.length
  ? checked.reduce((total, item) => {
      return total + "," + item;
    })
  : "";



  
  useEffect(()=>{
    var newList = []
    expedientes.forEach(element => {
      checked.forEach(element2 => {
        var result = []
        for (var i in element)
          if (i!== 'entradas' && i!=='documents' && i!=='user' && i!=='montoActualizado' && i!=='direccionContratista'){
            result.push(element[i])
          }
         
        
        // // result = result.splice(2,1)
        console.log(result)
        //  console.log(result)
        if (element._id == element2){
          newList.push(result)
        }
      })
    })
    newList.unshift(['ID','Nombre Contrato','I.T.O','CONTRATISTA','DIRECCIÓN OBRA','MONTO','% AVANCE FISICO','%AVANCE FINANCIERO','ETAPA','ESTADO','FECHA INICIO','FECHA TERMINO','OBSERVACIONES'])


    setReports(newList)
    
    
    ;

  },[expedientes,checked])

  reports.border = 1

  function handleDownloadExcel() {
         downloadExcel({
          fileName: "Reporte",
          sheet: "Hoja1",
          tablePayload: {
            header ,
            //accept two different data structures
            body: reports|| reports,
          },
        });
      }

  var isChecked = (item) =>
  checked.includes(item) ? "checked-item" : "not-checked-item";

    
  
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
        <SearchBox/>
        </Row>
        <h1>Seleccionar expedientes</h1>

        
        {loading ? <Loader/>
          :error?<Message variant='danger'>{error}</Message>
          :
        <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Encargado</th>
                    <th>Contratista</th>
                    <th>Etapa</th>
                    <th>Estado</th>
                    <th>Fecha de Inicio</th>
                    <th>Fecha de Termino</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {expedientes.map(expediente=>(
                    <tr key = {expediente._id}>
                      <td><input
                        type="checkbox"
                        id={`custom-checkbox-${expediente._id}`}
                        name={expediente.name}
                        value={expediente._id}
                        onChange={handleCheck}
                      /></td>
                      <td>{expediente._id}</td>                      
                      <td>{expediente.name}</td>
                      <td>{expediente.asignTo}</td>
                      <td>{expediente.contratist}</td>
                      <td>{expediente.stage}</td>
                      <td>{expediente.state}</td>
                      <td>{expediente.dateStart}</td>
                      <td>{expediente.dateEnd}</td>

                    </tr>
                  ))}

                </tbody>
              </Table>
              
        }  
        
      <div>
        {`Expedientes seleccionados: ${checkedItems}`}
        <button onClick={handleDownloadExcel}>Descargar Reporte</button>
      </div>      
    </div>
  )
}

export default ExpedienteReporteScreen