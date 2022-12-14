import React,{useState} from 'react'
import {Button,Form} from 'react-bootstrap'
import {useLocation, useNavigate } from 'react-router-dom'

function SearchBox() {
    const [keyword,setKeyWord] = useState('')
    const location = useLocation();

    let history =  useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        if (keyword) {
           history(`?keyword=${keyword}`)
        } else {
           history("/expedientes")
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type = 'text'
                name = 'q'
                onChange={(e)=>setKeyWord(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >Buscar
            </Button>
        </Form>
    )
}

export default SearchBox