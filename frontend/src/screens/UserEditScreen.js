import React,{useState,useEffect} from 'react'
import { Link,useLocation,useNavigate,useParams } from 'react-router-dom'
import { Form,Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails,updateUser } from '../actions/userActions'
import {USER_UPDATE_RESET} from '../constants/userConstants'


function UserEditScreen({match}) {

    const userId = useParams()

    const [first_name,setFirst_name] = useState('')
    const [last_name,setLast_name] = useState('')
    const [email,setEmail] = useState('')
    const [cargo,setCargo] = useState('')
    const [isAdmin,setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    
    const location = useLocation()
    const history = useNavigate()
    
    // const redirect = location.search ? location.search.split('=')[1]:'/'
    
    const userDetails = useSelector(state => state.userDetails)
    const {error,loading,user} = userDetails
    
    const userUpdate = useSelector(state => state.userUpdate)
    const {error:errorUpdate,loading:loadingUpdate,success:succesUpdate} = userUpdate

    //  console.log(user)
    // // console.log(user._id)
    
    useEffect(() => {
        if (succesUpdate){
            dispatch({type:USER_UPDATE_RESET})
            history('/admin/ListUsers/')
        }else{
            if (!user.first_name || user._id !== Number(userId.id)){
                dispatch(getUserDetails(userId.id))
            }else{
                setFirst_name(user.first_name)
                setLast_name(user.last_name)
                setEmail(user.email)
                setCargo(user.cargo)
                setIsAdmin(user.isAdmin)
            }
        }

    },[user,userId.id,succesUpdate,history])
    const navigate = useNavigate();
    
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(updateUser({_id:user._id,email,first_name,last_name,cargo,isAdmin}))
        
    }

    return (
        <div>
        <Link to="/admin/ListUsers/" className='btn btn-dark my-3'>Volver</Link>
        <FormContainer>
            <h1>Editar Usuario</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? <Loader/>:error?<Message variant='danger'>{error}</Message>
            :(
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Ingresar nombre'
                            value = {first_name}
                            onChange={(e)=>setFirst_name(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Ingresar Apellido'
                            value = {last_name}
                            onChange={(e)=>setLast_name(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>

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

                    <Form.Group controlId='isadmin'>
                    <Form.Label></Form.Label>
                        <Form.Check
                        type='checkbox'
                        label='Administrador'
                        checked = {isAdmin}
                        onChange={(e)=>setIsAdmin(e.target.checked)}
                        >
                        </Form.Check>
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


export default UserEditScreen