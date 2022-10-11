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
            description
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