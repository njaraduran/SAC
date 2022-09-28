import React,{useState,useEffect} from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { Form,Button,Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

import { register } from '../actions/userActions'



function RegisterScreen() {
    const [first_name,setFirst_name] = useState('')
    const [email,setEmail] = useState('')
    const [cargo,setCargo] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')
    
    const dispatch = useDispatch()
    
    const location = useLocation()
    const history = useNavigate()
    
    const redirect = location.search ? location.search.split('=')[1]:'/'
    
    const userRegister = useSelector(state => state.userRegister)
    const {error,loading,userInfo} = userRegister
    
    // useEffect(() => {
    //     if (userInfo){
    //     history(redirect)
    //     }
    // }, [history,userInfo,redirect])
    const navigate = useNavigate();
    
    const submitHandler = (e)=>{
        e.preventDefault()

        if (password !== confirmPassword){
            setMessage('Contraseñas no coinciden')
        }else{
            dispatch(register(first_name,email,password))
            navigate('/MainPage')
        }
        
        
    }

    return (
        <div>
        <Link to="/login" className='btn btn-dark my-3'>Volver</Link>
        {message && <Message variant='danger'>{message}</Message>}
        <FormContainer>
            <h1>Registrar nuevo usuario</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Ingresar nombre'
                        value = {first_name}
                        onChange={(e)=>setFirst_name(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                    required
                    type='email'
                    placeholder='Ingresar correo'
                    value = {email}
                    onChange={(e)=>setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                <Form.Label>Cargo</Form.Label>
                    <Form.Control
            
                    type='cargo'
                    placeholder='Cargo del usuario'
                    value = {cargo}
                    onChange={(e)=>setCargo(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                    required
                    type='password'
                    placeholder='Ingresar Contraseña'
                    value = {password}
                    onChange={(e)=>setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                    required
                    type='Password'
                    placeholder='Confirmar Contrasña'
                    value = {confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
            
                <Button type='submit' variant='primary'>
                    Registrar
                </Button>
            </Form>
        </FormContainer>
        </div>
    )

}


export default RegisterScreen