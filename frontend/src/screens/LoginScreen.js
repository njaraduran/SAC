import React,{useState,useEffect} from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { Form,Button,Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

import { login } from '../actions/userActions'


function LoginScreen() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const dispatch = useDispatch()

  const location = useLocation()
  const history = useNavigate()

  const redirect = location.search ? location.search.split('=')[1]:'/'

  const userLogin = useSelector(state => state.userLogin)
  const {error,loading,userInfo} = userLogin

  const navigate = useNavigate();

  useEffect(() => {
    let redir2 = ''
    if (userInfo){
      redir2 = '/mainPage'
    }else{
      redir2 = '/'
    }
    
    if (userInfo){
      history(redir2)
    }
  }, [history,userInfo,redirect])
  

  const submitHandler = (e)=>{
    e.preventDefault()
      dispatch(login(email,password))
    }

  return (
    <FormContainer>
        <h1>Iniciar Sesión</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type='email'
              placeholder='Ingresar correo'
              value = {email}
              onChange={(e)=>setEmail(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type='password'
              placeholder='Ingresar contraseña'
              value = {password}
              onChange={(e)=>setPassword(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          
          <Button type='submit' variant='primary'>
            Ingresar
          </Button>

        </Form>

        <Row className='py-3'>
          <Col>
            Sin cuenta?<Link
            to={redirect ? `/register?redirect=${redirect}`:'/register'}>
            Registrarse 
            </Link>
          </Col>
        </Row>




    </FormContainer>
  )
}

export default LoginScreen