import React,{useState,useEffect} from 'react'
import { Link,useLocation,useNavigate,useParams } from 'react-router-dom'
import { Form,Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listExpedienteDetails,updateExpediente } from '../actions/expedienteActions'
import {EXPEDIENTES_UPDATE_RESET} from '../constants/expedienteConstants'

function ExpedienteEditScreen({match}) {

    const expedienteId = useParams()
    const [name,setName] = useState('')
    const [asignTo,setAsignTo] = useState('')
    const [contratist,setContratis] = useState('')
    const [stage,setStage] = useState('')
    const [state,setState] = useState('')
    const [dateStart,setDateStart] = useState('')
    const [dateEnd,setDateEnd] = useState('')
    const [description,setDescription] = useState('')
    const [direccionContratista,setDireccionContratista] = useState('')
    const [direccion,setDireccion] = useState('')
    // const [fechaAdjudicacion,setFechaAdjudicacion] = useState('')
    // const [fechaContratacion,setFechaContratacion] = useState('')
    const [montoInicial,setMontoInicial] = useState('')
    const [montoActualizado,setMontoActualizado] = useState('')
    const [pAvanceFisico,setPAvanceFisico] = useState('')
    const [pAvanceFinanciero,setPAvanceFinanciero] = useState('')


    const dispatch = useDispatch()    
    const history = useNavigate()
    
    const expedienteDetails = useSelector(state => state.expedienteDetails)
    const {error,loading,expediente} = expedienteDetails
    
    const expedienteUpdate = useSelector(state => state.expedienteUpdate)
    const {error:errorUpdate,loading:loadingUpdate,success:successUpdate} = expedienteUpdate
    
   
    useEffect(() => {

        if (successUpdate) {
            dispatch({type:EXPEDIENTES_UPDATE_RESET})
            history('/admin/expedientes')
        } else {
            if (!expediente.name || expediente._id !== Number(expedienteId.id)){
                dispatch(listExpedienteDetails(expedienteId.id))
            }else{
                setName(expediente.name)
                setAsignTo(expediente.asignTo)
                setContratis(expediente.contratist)
                setStage(expediente.stage)
                setState(expediente.state)
                setDateStart(expediente.dateStart)
                setDateEnd(expediente.dateEnd)
                setDescription(expediente.description)
                setDireccionContratista(expediente.direccionContratista)
                setDireccion(expediente.direccion)
                // setFechaAdjudicacion(expediente.fechaAdjudicacion)
                // setFechaContratacion(expediente.fechaContratacion)
                setMontoInicial(expediente.montoInicial)
                setMontoActualizado(expediente.montoActualizado)
                setPAvanceFisico(expediente.pAvanceFisico)
                setPAvanceFinanciero(expediente.pAvanceFinanciero)



            }           
        }        
    },[dispatch,expediente,expedienteId.id,history])

    
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(updateExpediente({
            _id: expedienteId,
            name,
            asignTo,
            contratist,
            stage,
            state,
            dateStart,
            dateEnd,
            description,
            direccionContratista,
            direccion,
            // fechaAdjudicacion,
            // fechaContratacion,
            montoInicial,
            montoActualizado,
            pAvanceFisico,
            pAvanceFinanciero
        }))
                
    }

    return (
        <div>
        <Link to="/admin/expedientes/" className='btn btn-dark my-3'>Volver</Link>
        <FormContainer>
            <h1>Editar Expediente</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? <Loader/>:error?<Message variant='danger'>{error}</Message>
            :(
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Nombre del Expediente</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Ingresar nombre'
                            value = {name}
                            onChange={(e)=>setName(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='asignTo'>
                        <Form.Label>Encargado</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Ingresar encargado'
                            value = {asignTo}
                            onChange={(e)=>setAsignTo(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='contratist'>
                        <Form.Label>Contratista</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Ingresar contratista'
                            value = {contratist}
                            onChange={(e)=>setContratis(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='direccionContratista'>
                        <Form.Label>Direccion contratista</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Dirección del contratista'
                            value = {direccionContratista}
                            onChange={(e)=>setDireccionContratista(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='stage'>
                        <Form.Label>Etapa</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Ingresar etapa'
                            value = {stage}
                            onChange={(e)=>setStage(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='state'>
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Ingresar estado'
                            value = {state}
                            onChange={(e)=>setState(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='dateStart'>
                        <Form.Label>Fecha de inicio</Form.Label>
                        <Form.Control
                            type='date'
                            value = {dateStart}
                            onChange={(e)=>setDateStart(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='dateEnd'>
                        <Form.Label>Fecha de termino</Form.Label>
                        <Form.Control
                            type='date'
                            value = {dateEnd}
                            onChange={(e)=>setDateEnd(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>


{/* 
                    <Form.Group controlId='fechaAdjudicacion'>
                        <Form.Label>Fecha de adjudicación</Form.Label>
                        <Form.Control
                            type='date'
                            value = {fechaAdjudicacion}
                            onChange={(e)=>setFechaAdjudicacion(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='fechaContratacion'>
                        <Form.Label>Fecha de Contratación</Form.Label>
                        <Form.Control
                            type='date'
                            value = {fechaContratacion}
                            onChange={(e)=>setFechaContratacion(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group> */}


                    <Form.Group controlId='direccion'>
                        <Form.Label>Dirección de la obra</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Dirección'
                            value = {direccion}
                            onChange={(e)=>setDireccion(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>
                    


                    <Form.Group controlId='montoInicial'>
                        <Form.Label>Monto inicialde la obra</Form.Label>
                        <Form.Control
                            type='input'
                            placeholder='Monto Inicial de la Obra'
                            value = {montoInicial}
                            onChange={(e)=>setMontoInicial(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='montoActualizado'>
                        <Form.Label>Monto actual de la obra</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='montoActualizado'
                            value = {montoActualizado}
                            onChange={(e)=>setMontoActualizado(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='pAvanceFisico'>
                        <Form.Label>Porcentaje de avance físico de la obra</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='pAvanceFisico'
                            value = {pAvanceFisico}
                            onChange={(e)=>setPAvanceFisico(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='pAvanceFinanciero'>
                        <Form.Label>Porcentaje de avance financiero</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='pAvanceFinanciero'
                            value = {pAvanceFinanciero}
                            onChange={(e)=>setPAvanceFinanciero(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>















                    <Form.Group controlId='description'>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type='text'
                            value = {description}
                            onChange={(e)=>setDescription(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>


                
                    <Button type='submit' variant='primary'>
                        Actualizar
                    </Button>
                </Form>
            )}

        </FormContainer>
        </div>
    )

}


export default ExpedienteEditScreen